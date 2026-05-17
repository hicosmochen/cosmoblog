# ViewPager基础用法





[[TOC]]











## 第一章 简述说明

### 第01节 基础介绍

```
采用 ViewPager 可以实现多个页面的切换效果，每个页面都是一个 Fragment，多个页面组合可以实现左右滑动切换页面的效果
```

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-06-11_12-43-08.png">







### 第02节 官方链接

```
https://developer.android.google.cn/guide/navigation/navigation-swipe-view-2?hl=zh-cn
```















## 第二章 基础实现


### 第01节 项目准备

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-06-11_12-43-37.png">

> 在 gradle 当中添加引用的信息
>
> `implementation "androidx.viewpager2:viewpager2:1.0.0"`







### 第02节 案例代码

**布局文件1： `activity_main.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/viewpager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />


</LinearLayout>
```

**布局文件2： `fragment_my.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.MainActivity">

    <FrameLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <ImageView
            android:id="@+id/image"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" />

        <TextView
            android:id="@+id/text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:background="#FFFF00"
            android:textColor="#FF0000"
            android:textSize="30dp" />

    </FrameLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```



**Java代码 MainActivity**

```java

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager2.widget.ViewPager2;

import java.io.IOException;
import java.util.ArrayList;

import cheng.cosmo.R;

public class MainActivity extends AppCompatActivity {

    private final Context context = MainActivity.this;

    private MyAdapter myAdapter;
    private ViewPager2 viewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        viewPager = findViewById(R.id.viewpager);

        ArrayList<Bitmap> arrayList = new ArrayList<>();
        initData(arrayList);

        myAdapter = new MyAdapter(this, arrayList);
        viewPager.setAdapter(myAdapter);

    }

    private void initData(ArrayList<Bitmap> arrayList) {
        try {
            arrayList.add(BitmapFactory.decodeStream(context.getAssets().open("pic/demo_001.png")));
            arrayList.add(BitmapFactory.decodeStream(context.getAssets().open("pic/demo_002.png")));
            arrayList.add(BitmapFactory.decodeStream(context.getAssets().open("pic/demo_003.png")));
            arrayList.add(BitmapFactory.decodeStream(context.getAssets().open("pic/demo_004.png")));
            arrayList.add(BitmapFactory.decodeStream(context.getAssets().open("pic/demo_005.png")));
            arrayList.add(BitmapFactory.decodeStream(context.getAssets().open("pic/demo_006.png")));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
```

**Java代码MyFragment**

```java
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.util.ArrayList;

import cheng.cosmo.R;

public class MyFragment extends Fragment {


    public static final String KEY_POSITION = "key_position";
    public static final String KEY_DATA = "key_data";

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_my, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        Bundle args = getArguments();
        if (args != null) {
            ArrayList<Bitmap> arrayList = args.getParcelableArrayList(KEY_DATA);
            int position = args.getInt(KEY_POSITION);
            TextView textView = view.findViewById(R.id.text);
            ImageView imageView = view.findViewById(R.id.image);
            textView.setText("position:" + position);
            imageView.setImageBitmap(arrayList.get(position));
        }
    }
}
```

**Java代码 MyAdapter**

```java

import android.graphics.Bitmap;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import java.util.ArrayList;

public class MyAdapter extends FragmentStateAdapter {

    private final ArrayList<Bitmap> data;

    public MyAdapter(@NonNull FragmentActivity activity, ArrayList<Bitmap> data) {
        super(activity);
        this.data = data;
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        Fragment fragment = new MyFragment();
        Bundle args = new Bundle();
        args.putInt(MyFragment.KEY_POSITION, position);
        args.putParcelableArrayList(MyFragment.KEY_DATA, data);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public int getItemCount() {
        return data.size();
    }
}
```















## 第三章 选项卡绑定

### 第01节 基础修改

**修改1：**

> 需要在 viewPager 的布局文件当中，前面添加 TabLayout

位置 `activity_main.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">


    <com.google.android.material.tabs.TabLayout
        android:id="@+id/tab_layout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />


    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/viewpager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />


</LinearLayout>
```



**修改2**

> 需要在初始化 ViewPager 的时候，绑定 TabLayout

位置 `MainActivity.java`

```java
private TabLayout tabLayout;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    viewPager = findViewById(R.id.viewpager);
    
    ArrayList<Bitmap> arrayList = new ArrayList<>();
    initData(arrayList);

    myAdapter = new MyAdapter(this, arrayList);
    viewPager.setAdapter(myAdapter);

    // ----------------------------------------------------------------------
    tabLayout = findViewById(R.id.tab_layout);
    new TabLayoutMediator(tabLayout, viewPager, (tab, position) -> {
        tab.setText("选项卡" + (position + 1));
    }).attach();
    // ----------------------------------------------------------------------
}
```

> 需要注意的问题： 这里的 `new TableLayoutMediator` 必须放在 `viewPager.setAdapter(myAdapter)` 代码之后才能生效





















