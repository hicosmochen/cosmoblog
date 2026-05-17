# MQTT基础案例







[[TOC]]





## 第一章 基础代码

### 第01节 准备工作

添加依赖

```
dependencies {
    implementation 'org.eclipse.paho:org.eclipse.paho.client.mqttv3:1.1.0'
}
```

权限声明

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

服务清单定义

```
<service android:name=".MqttService"/>
```











### 第02节 缓存数据

```java
import android.text.TextUtils;

import org.json.JSONArray;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

// 用于缓存的数据
public class MqttCacheData {

    // 缓存池的大小
    public static final int DEFAULT_CORE_CACHE_NUMBER = 3;
    public static final int DEFAULT_TEMP_CACHE_NUMBER = 2;

    // 缓存池的大小
    private int coreCacheNumber = DEFAULT_CORE_CACHE_NUMBER;
    private int tempCacheNumber = DEFAULT_TEMP_CACHE_NUMBER;

    // 缓存数据
    private final LinkedHashSet<String> cacheData = new LinkedHashSet<>();

    private MqttCacheData() {
    }

    private static class MqttCacheDataInstance {
        private static final MqttCacheData INSTANCE = new MqttCacheData();
    }

    public static MqttCacheData getInstance() {
        return MqttCacheDataInstance.INSTANCE;
    }

    // 设置缓冲池的两个参数（1.核心缓存数, 2.临时缓存数）
    public void setConfig(int coreCacheNumber, int tempCacheNumber) {
        this.coreCacheNumber = coreCacheNumber;
        this.tempCacheNumber = tempCacheNumber;
    }

    // 清除数据
    public void clear() {
        cacheData.clear();
    }

    // 添加数据
    public void append(byte[] array) {
        append(new String(array));
    }

    // 添加数据
    public void append(String message) {
        // 查看是否包含有当前数据, 如果包含那么需要删除当前数据, 如果不包含那么直接放置在最后
        List<String> list = new ArrayList<>(cacheData);
        int index = -1;
        for (int i = 0; i < list.size(); i++) {
            if (TextUtils.equals(list.get(i), message)) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            list.remove(index);
        }
        list.add(message);
        // 这里做缓存的策略
        handlePloy(list);

        cacheData.clear();
        cacheData.addAll(list);
    }


    // 处理缓存的策略
    private void handlePloy(List<String> list) {
        //  coreCacheNumber = 3;
        //  tempCacheNumber = 3;
        //-----------------------------------------------------------------
        int maxNumber = coreCacheNumber + tempCacheNumber;
        // 判断缓存的操作
        List<String> tempList = new ArrayList<>();
        // 当前的数量, 大于当前定义的数量
        if (list.size() > maxNumber) {
            int count = list.size() - maxNumber;
            // 移除临时数据
            for (int i = 0; i < list.size(); i++) {
                if (i < Math.min(tempCacheNumber, count)) {
                    continue;
                }
                tempList.add(list.get(i));
            }

            list.clear();
            list.addAll(tempList);
        }
    }


    // 获取到数据
    public String getData() {
        JSONArray jsonArray = new JSONArray();
        for (String element : cacheData) {
            jsonArray.put(element);
        }
        return jsonArray.toString();
    }
}
```





### 第03节 工厂类

```java
import android.text.TextUtils;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

// MQTT连接的工厂, 核心API的基础准备
public class MqttFactory {

    private MqttClient mqttClient;

    private String mqttURL;
    private String topic;
    private int qos;
    private MqttConnectOptions options;

    private String messageData;

    // 回调接口 (状态监听器)
    private OnMqttStateListener onMqttStateListener;

    // 回调接口 (数据监听器)
    private OnMqttDataListener onMqttDataListener;


    private MqttFactory() {
    }

    private static class MqttFactoryInstance {
        private static final MqttFactory INSTANCE = new MqttFactory();
    }

    public static MqttFactory getInstance() {
        return MqttFactoryInstance.INSTANCE;
    }

    // MQTT 准备连接
    public void mqttOnConnect(String mqttURL, String topic, int qos, MqttConnectOptions options) {
        mqttOnConnect(mqttURL, topic, qos, 
                      MqttCacheData.DEFAULT_CORE_CACHE_NUMBER,
                      MqttCacheData.DEFAULT_TEMP_CACHE_NUMBER, options);
    }

    // MQTT 准备连接
    public void mqttOnConnect(String mqttURL, String topic, int qos, 
                              int coreNumber, int tempNumber, MqttConnectOptions options) {
        this.mqttURL = mqttURL;
        this.topic = topic;
        this.qos = qos;
        this.options = options;
        MqttCacheData.getInstance().setConfig(coreNumber, tempNumber);
        //-----------------------------------------------------------------
        open();
        subscribe();
    }

    // 打开
    private void open() {
        try {
            String clientId = MqttClient.generateClientId();
            MemoryPersistence persistence = new MemoryPersistence();

            // 清除缓存的数据
            MqttCacheData.getInstance().clear();

            mqttClient = new MqttClient(mqttURL, clientId, persistence);
            // 设置回调函数
            mqttClient.setCallback(new MqttCallback() {
                // 连接断开
                @Override
                public void connectionLost(Throwable throwable) {

                    if (onMqttStateListener != null) {
                        onMqttStateListener.onStateLost(throwable);
                    }
                }

                // 接收到消息
                @Override
                public void messageArrived(String topic, MqttMessage mqttMessage) throws Exception {

                    byte[] array;

                    if (TextUtils.isEmpty(messageData)) {
                        array = mqttMessage.getPayload();
                    } else {
                        array = messageData.getBytes();
                    }

                    // 缓存数据
                    MqttCacheData.getInstance().append(array);

                    MqttMessage message = new MqttMessage();
                    message.setPayload(array);


                    if (onMqttDataListener != null) {
                        onMqttDataListener.onReceive(topic, new String(array));
                    }

                    // 发布消息
                    publishMessage(topic, message);
                }

                // 没用过
                @Override
                public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {

                }
            });
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }

    public void changeData(String messageData) {
        this.messageData = messageData;
    }

    // 订阅
    private void subscribe() {
        new Thread(() -> {
            try {
                mqttClient.connect(options);
                if (mqttClient.isConnected()) {
                    mqttClient.subscribe(topic, qos);

                    // 开始连接
                    if (onMqttStateListener != null) {
                        onMqttStateListener.onStateOpen();
                    }

                }
            } catch (MqttException e) {
                throw new RuntimeException(e);
            }
        }).start();
    }


    // 发布消息
    private void publishMessage(String topic, MqttMessage message) {
        new Thread(() -> {
            try {
                mqttClient.publish(topic, message);
            } catch (MqttException e) {
                throw new RuntimeException(e);
            }
        }).start();
    }


    // 取消订阅
    public void mqttDisConnect() {
        try {
            if (mqttClient != null && mqttClient.isConnected()) {
                mqttClient.disconnect();

                if (onMqttStateListener != null) {
                    onMqttStateListener.onStateClose();
                }
            }
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }


    // 获取到缓存数据
    public String getCacheData() {
        return MqttCacheData.getInstance().getData();
    }

    // 设置MQTT数据的监听器
    public void setOnMqttDataListener(OnMqttDataListener onMqttDataListener) {
        this.onMqttDataListener = onMqttDataListener;
    }

    // 接收数据的接口
    public interface OnMqttDataListener {

        void onReceive(String topic, String message);  // 接收到数据
    }

    // 设置MQTT状态的监听器
    public void setOnMqttStateListener(OnMqttStateListener onMqttStateListener) {
        this.onMqttStateListener = onMqttStateListener;
    }

    // 接收状态的接口
    public interface OnMqttStateListener {

        void onStateOpen();   // 状态开始

        void onStateClose();  // 状态关闭

        void onStateLost(Throwable throwable);  // 状态丢失连接
    }
}
```



### 第04节 服务类

```java
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

import org.eclipse.paho.client.mqttv3.MqttConnectOptions;

/****
 *
 * @apiNote 订阅MQTT的后台服务 （1.开始订阅, 2.监听状态, 3.监听数据, 4.数据改变,  5.取消订阅）
 */
public class MqttService extends Service {

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        String mqttURL = "tcp://broker.hivemq.com:1883";
        String topic = "test/topic";    // 订阅的Topic
        int qos = 0;                    // 消息等级

        MqttConnectOptions options = new MqttConnectOptions();
        options.setCleanSession(true);  // 清除连接信息
        options.setUserName("cosmo");   // 设置连接的用户名
        options.setPassword("1234".toCharArray());   // 设置连接的密码
        options.setConnectionTimeout(3);  // 设置连接的超时时间 单位为秒
        options.setKeepAliveInterval(60);   // 心跳包时间 60s

        // 【1】开始订阅
        MqttFactory.getInstance().mqttOnConnect(mqttURL, topic, qos, 2, 1, options);


        // 【2】监听 状态
        MqttFactory.getInstance().setOnMqttStateListener(new MqttFactory.OnMqttStateListener() {
            @Override
            public void onStateOpen() {
                Log.v("cosmo", "cosmo.MqttService.onStateOpen..开始连接");
            }

            @Override
            public void onStateClose() {
                Log.v("cosmo", "cosmo.MqttService.onStateClose..关闭连接");
            }

            @Override
            public void onStateLost(Throwable throwable) {
                Log.v("cosmo", "cosmo.MqttService.onStateLost..失去连接");
            }
        });

        // 【3】监听 数据
        MqttFactory.getInstance().setOnMqttDataListener((topics, message) -> {
            String cacheData = MqttFactory.getInstance().getCacheData();

            String msg = "接收数据.topic: " + topics + ", message: " + message + ", cacheData: " + cacheData;
            Log.v("cosmo", "cosmo.MqttService.onReceive.." + msg);
        });
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        // 【4】取消订阅
        MqttFactory.getInstance().mqttDisConnect();
    }
}

```





### 第05节 界面类

```java
public class DemoActivity extends AppCompatActivity {

    private final Context context = DemoTestActivity.this;

    private Intent mqttIntent;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_demo);

        // 开启服务
        mqttIntent = new Intent();
        mqttIntent.setClass(context, MqttService.class);
        startService(mqttIntent);


        // 测试数据的操作
        long every = 3000L;
        // 【5】开启改变数据
        new Handler().postDelayed(() -> MqttFactory.getInstance().changeData("改变数据了!"), every);
        new Handler().postDelayed(() -> MqttFactory.getInstance().changeData("wocao"), every * 2);
        new Handler().postDelayed(() -> MqttFactory.getInstance().changeData("消息啊1"), every * 3);
        new Handler().postDelayed(() -> MqttFactory.getInstance().changeData("消息啊2"), every * 4);
        new Handler().postDelayed(() -> MqttFactory.getInstance().changeData("消息啊3"), every * 5);
        new Handler().postDelayed(() -> MqttFactory.getInstance().changeData("消息啊4"), every * 6);
        new Handler().postDelayed(() -> MqttFactory.getInstance().changeData("消息啊5"), every * 7);
        new Handler().postDelayed(() -> MqttFactory.getInstance().changeData("消息啊6"), every * 8);
        new Handler().postDelayed(() -> MqttFactory.getInstance().changeData("消息啊7"), every * 9);

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        // 取消服务
        stopService(mqttIntent);
    }
}

```



### 第06节 最终结果

```
cosmo.MqttService.onStateOpen..开始连接
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 改变数据了!, cacheData: ["wocao","改变数据了!"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 改变数据了!, cacheData: ["wocao","改变数据了!"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 改变数据了!, cacheData: ["wocao","改变数据了!"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 改变数据了!, cacheData: ["wocao","改变数据了!"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 改变数据了!, cacheData: ["wocao","改变数据了!"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 改变数据了!, cacheData: ["wocao","改变数据了!"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 改变数据了!, cacheData: ["wocao","改变数据了!"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 改变数据了!, cacheData: ["wocao","改变数据了!"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 改变数据了!, cacheData: ["wocao","改变数据了!"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 改变数据了!, cacheData: ["wocao","改变数据了!"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["改变数据了!","wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["改变数据了!","wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["改变数据了!","wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["改变数据了!","wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["改变数据了!","wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["改变数据了!","wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["改变数据了!","wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["改变数据了!","wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: wocao, cacheData: ["改变数据了!","wocao"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊1, cacheData: ["改变数据了!","wocao","消息啊1"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊2, cacheData: ["wocao","消息啊1","消息啊2"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊3, cacheData: ["消息啊1","消息啊2","消息啊3"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊4, cacheData: ["消息啊2","消息啊3","消息啊4"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊4, cacheData: ["消息啊2","消息啊3","消息啊4"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊4, cacheData: ["消息啊2","消息啊3","消息啊4"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊4, cacheData: ["消息啊2","消息啊3","消息啊4"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊4, cacheData: ["消息啊2","消息啊3","消息啊4"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊4, cacheData: ["消息啊2","消息啊3","消息啊4"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊4, cacheData: ["消息啊2","消息啊3","消息啊4"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊4, cacheData: ["消息啊2","消息啊3","消息啊4"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊4, cacheData: ["消息啊2","消息啊3","消息啊4"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊4, cacheData: ["消息啊2","消息啊3","消息啊4"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊5, cacheData: ["消息啊3","消息啊4","消息啊5"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊6, cacheData: ["消息啊4","消息啊5","消息啊6"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊6, cacheData: ["消息啊4","消息啊5","消息啊6"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊6, cacheData: ["消息啊4","消息啊5","消息啊6"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊6, cacheData: ["消息啊4","消息啊5","消息啊6"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊6, cacheData: ["消息啊4","消息啊5","消息啊6"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊6, cacheData: ["消息啊4","消息啊5","消息啊6"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊6, cacheData: ["消息啊4","消息啊5","消息啊6"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊6, cacheData: ["消息啊4","消息啊5","消息啊6"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊6, cacheData: ["消息啊4","消息啊5","消息啊6"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onReceive..接收数据.topic: test/topic, message: 消息啊7, cacheData: ["消息啊5","消息啊6","消息啊7"]
cosmo.MqttService.onStateClose..关闭连接
```



















