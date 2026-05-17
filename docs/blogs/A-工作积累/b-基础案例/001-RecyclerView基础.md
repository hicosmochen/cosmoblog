# RecyclerView 基础





[[TOC]]











## 第一章 基础用法

### 第01节 效果演示

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-06-11_12-37-18.png">





> 左图: 展示的是列表项。
>
> 右图: 展示的是列表项当中的点击效果。







### 第02节 抽取 Adapter 基类

基类 `BaseRecAdapter.java`

```java
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public abstract class BaseRecAdapter<DATA, HOLDER extends BaseRecHolder> extends RecyclerView.Adapter<HOLDER> {

    protected Context context;
    protected List<DATA> data;
    protected OnItemClickListener onItemClickListener;

    public BaseRecAdapter(Context context, List<DATA> data) {
        this.context = context;
        this.data = data;
    }

    @NonNull
    @Override
    public HOLDER onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return initViewHolder(parent, viewType);
    }

    @Override
    public void onBindViewHolder(@NonNull HOLDER holder, int position) {
        initBindData(holder, position, getItemViewType(position));
        // 点击效果
        holder.itemView.setOnClickListener(v -> {
            if (onItemClickListener != null) {
                onItemClickListener.onItemClick(holder.itemView, position, getItemViewType(position));
            }
        });
    }


    @Override
    public int getItemCount() {
        return data == null ? 0 : data.size();
    }

    // 初始化 ViewHolder
    protected abstract HOLDER initViewHolder(ViewGroup parent, int viewType);

    // 初始化 BindData
    protected abstract void initBindData(HOLDER holder, int position, int itemViewType);

    public void setOnItemClickListener(OnItemClickListener onItemClickListener) {
        this.onItemClickListener = onItemClickListener;
    }

    // 点击事件的回调
    public interface OnItemClickListener {
        void onItemClick(View itemView, int position, int viewType);
    }
}
```





### 第03节 抽取 ViewHolder 基类

基类 `BaseRecHolder.java`

```java
import android.view.View;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class BaseRecHolder extends RecyclerView.ViewHolder {

    public BaseRecHolder(@NonNull View itemView) {
        super(itemView);
    }
}
```













## 第二章 案例代码

### 第01节  定义Activity布局文件

 `activity_main.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    style="@style/MyMainBack"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recycler_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</FrameLayout>
```





### 第02节 定义 Item 布局文件

 `item.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.appcompat.widget.LinearLayoutCompat xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@color/white"
    android:orientation="vertical"
    android:padding="@dimen/dp_0020">


    <androidx.appcompat.widget.AppCompatTextView
        android:id="@+id/text_view_id"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />


    <androidx.appcompat.widget.AppCompatTextView
        android:id="@+id/text_view_name"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />


    <androidx.appcompat.widget.AppCompatTextView
        android:id="@+id/text_view_desc"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</androidx.appcompat.widget.LinearLayoutCompat>
```





### 第03节 Activity

来自于 Activity 当中的写法 `MainActivity.java`

```java

import android.content.Context;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;


public class MainActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private final Context context = DemoTestActivity.this;
    private final List<HeroBean> dataList = new ArrayList<>();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recyclerView = findViewById(R.id.recycler_view);

        dataList.add(new HeroBean(1, "宋江", "呼保义"));
        dataList.add(new HeroBean(2, "卢俊义", "玉麒麟"));
        dataList.add(new HeroBean(3, "吴用", "智多星"));
        dataList.add(new HeroBean(4, "公孙胜", "入云龙"));


        HeroAdapter adapter = new HeroAdapter(context, dataList);
        LinearLayoutManager manager = new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false);
        recyclerView.setLayoutManager(manager);
        recyclerView.setAdapter(adapter);

        // 点击事件
        adapter.setOnItemClickListener((itemView, position, viewType) -> {
            String message = "当前点击的是: " + position + ", 内容:" + dataList.get(position).getName();
            Toast.makeText(context, message, Toast.LENGTH_LONG).show();
        });
    }
}

```





### 第04节 实体类

定义实体类 `HeroBean.java`

```java
public class HeroBean {

    private int id;
    private String name;
    private String desc;

    public HeroBean() {
    }

    public HeroBean(int id, String name, String desc) {
        this.id = id;
        this.name = name;
        this.desc = desc;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @NonNull
    @Override
    public String toString() {
        return super.toString();
    }
}
```







### 第05节 ViewHolder

定义ViewHolder的写法 `HeroHolder.java`

```java
import android.view.View;

import androidx.appcompat.widget.AppCompatTextView;

public class HeroHolder extends BaseRecHolder {

    public AppCompatTextView textViewId;
    public AppCompatTextView textViewName;
    public AppCompatTextView textViewDesc;


    public HeroHolder(View itemView) {
        super(itemView);
        textViewId = itemView.findViewById(R.id.text_view_id);
        textViewName = itemView.findViewById(R.id.text_view_name);
        textViewDesc = itemView.findViewById(R.id.text_view_desc);
    }
}
```





### 第06节 Adapter

定义Adapter 的写法 `HeroAdapter.java`

```java

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.cosmo.good.study.R;
import com.cosmo.good.study.ui.activity.demo.base.BaseRecAdapter;

import java.util.List;

public class HeroAdapter extends BaseRecAdapter<HeroBean, HeroHolder> {

    public HeroAdapter(Context context, List<HeroBean> heroBeans) {
        super(context, heroBeans);
    }

    @Override
    protected HeroHolder initViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item, parent, false);
        return new HeroHolder(itemView);
    }


    @Override
    protected void initBindData(HeroHolder holder, int position, int itemViewType) {
        holder.textViewId.setText(String.valueOf(data.get(position).getId()));
        holder.textViewName.setText(data.get(position).getName());
        holder.textViewDesc.setText(data.get(position).getDesc());
    }
}

```















## 第三章  基础设置

### 第01节 设置分割线

效果图

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-06-11_12-37-51.png">



> 左图：未做显示分割线的情况
>
> 右图：已经显示分割线的情况



分割线的实现类

```java
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class SimpleDecoration extends RecyclerView.ItemDecoration {

    private float mDividerHeight;
    private final Paint mPaint;

    public SimpleDecoration() {
        mPaint = new Paint();
        mPaint.setAntiAlias(true);
        mPaint.setColor(Color.RED);
    }

    @Override
    public void getItemOffsets(
            @NonNull Rect outRect,
            @NonNull View view,
            @NonNull RecyclerView parent,
            @NonNull RecyclerView.State state) {

        super.getItemOffsets(outRect, view, parent, state);
        // 第一个ItemView不需要在上面绘制分割线
        if (parent.getChildAdapterPosition(view) != 0) {
            // 这里直接硬编码为1px
            outRect.top = 1;
            mDividerHeight = 1;
        }
    }

    @Override
    public void onDraw(
            @NonNull Canvas canvas,
            @NonNull RecyclerView parent,
            @NonNull RecyclerView.State state) {
        super.onDraw(canvas, parent, state);

        int childCount = parent.getChildCount();

        for (int i = 0; i < childCount; i++) {
            View view = parent.getChildAt(i);
            int index = parent.getChildAdapterPosition(view);
            if (index == 0) {
                continue;
            }
            float dividerTop = view.getTop() - mDividerHeight;
            float dividerLeft = parent.getPaddingLeft();
            float dividerBottom = view.getTop();
            float dividerRight = parent.getWidth() - parent.getPaddingRight();
            canvas.drawRect(dividerLeft, dividerTop, dividerRight, dividerBottom, mPaint);
        }
    }
}
```

添加分割线指示器

```java
// 这句话需要放在设置Adapter的方法之后
this.recyclerView.addItemDecoration(new SimpleDecoration());
```







### 第02节 设置点击背景

效果图

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-06-11_12-39-35.png">



> 左图：未做点击时的效果
>
> 右图：点击后的效果（备注：初次进入的时候默认显示第一项）







在 Adapter 当中设置 `HeroAdapter.java` 

在 Adapter 当中的准备工作：

```java
public class Adapter ... {

    // 1. 定义当前点击的位置, 作为成员变量
    private int currentPosition;

    // 2. 定义当前点击的位置, 生成 getXxx 方法
    public int getCurrentPosition() {
        return currentPosition;
    }

    // 3. 定义当前点击的位置, 生成 setXxx 方法
    public void setCurrentPosition(int currentPosition) {
        this.currentPosition = currentPosition;
    }

    // 4. 定义刷新的方式, 定义选中和未选中的情况
    public void flushItemBackground(int position, MyStudyAdapter.MyStudyViewHolder holder) {
        if (getCurrentPosition() == position) {
            holder.itemView.setBackgroundColor(Color.parseColor("#66FF9900"));
        } else {
            holder.itemView.setBackgroundColor(Color.parseColor("#FFFFFFFF"));
        }
    }
}
```

在 Adapter 的 `onBindViewHolder` 方法的写法

```java
@Override
public void onBindViewHolder(@NonNull HOLDER holder, int position) {
    // A. 设置刷新的位置和效果
    flushItemBackground(holder, position);

    // 点击效果
    holder.itemView.setOnClickListener(v -> {
        if (onItemClickListener != null) {
            onItemClickListener.onItemClick(holder.itemView, position, getItemViewType(position));
        }
        // ------------------------------------------------------------
        // B. 在 onBindViewHolder 当中, 点击事件, 点击时候, 显示列表
        setCurrentPosition(position);
        flushItemBackground(holder, position);
    	// ------------------------------------------------------------
        // C. 这里一定要刷新适配器, 才能生效
        notifyDataSetChanged();
    });
}
```

























