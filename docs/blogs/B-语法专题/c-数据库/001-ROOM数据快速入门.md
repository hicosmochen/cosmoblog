# ROOM数据库快速入门







[[TOC]]









## 第一章 准备工作

### 第01节 引入库

build.gradle 文件当中添加

```groovy
// 采用 Room 数据库的库
def room_version = "2.4.2" // 请检查最新版本
implementation "androidx.room:room-runtime:$room_version"
annotationProcessor "androidx.room:room-compiler:$room_version" // 对于 Java

// 采用rxjava的库（涉及到主线程和子线程的切换操作）
implementation 'io.reactivex.rxjava2:rxjava:2.2.19'
implementation 'io.reactivex.rxjava2:rxandroid:2.1.1'
```



### 第02节 布局文件

```xml
<androidx.appcompat.widget.LinearLayoutCompat
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_insert_dept"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:text="添加数据 - 部门" />

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_delete_dept"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:text="删除数据 - 部门" />

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_update_dept"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:text="修改数据 - 部门" />

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_query_dept"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:text="查询数据 - 部门" />


        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_insert_employee"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:text="添加数据 - 员工" />

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_delete_employee"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:text="删除数据 - 员工" />

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_update_employee"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:text="修改数据 - 员工" />

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_query_employee"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:text="查询数据 - 员工" />


        <androidx.appcompat.widget.AppCompatTextView
            android:id="@+id/text_view_show"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />


</androidx.appcompat.widget.LinearLayoutCompat>
```



### 第03节 activity类

```java
public class DemoTestActivity extends AppCompatActivity {

    private final Context context = DemoTestActivity.this;

    private AppCompatButton buttonInsertDept;
    private AppCompatButton buttonDeleteDept;
    private AppCompatButton buttonUpdateDept;
    private AppCompatButton buttonQueryDept;
    private AppCompatButton buttonInsertEmployee;
    private AppCompatButton buttonDeleteEmployee;
    private AppCompatButton buttonUpdateEmployee;
    private AppCompatButton buttonQueryEmployee;

    private AppCompatTextView textViewShow;

    private final Random random = new Random();
    private int indexDept = 1;
    private int indexEmployee = 1;


    private EntityService service;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_demo_test);

        buttonInsertDept = findViewById(R.id.button_insert_dept);
        buttonDeleteDept = findViewById(R.id.button_delete_dept);
        buttonUpdateDept = findViewById(R.id.button_update_dept);
        buttonQueryDept = findViewById(R.id.button_query_dept);
        buttonInsertEmployee = findViewById(R.id.button_insert_employee);
        buttonDeleteEmployee = findViewById(R.id.button_delete_employee);
        buttonUpdateEmployee = findViewById(R.id.button_update_employee);
        buttonQueryEmployee = findViewById(R.id.button_query_employee);

        textViewShow = findViewById(R.id.text_view_show);

        service = new EntityServiceImpl(context);
        // 初始化监听器
        initListener();
    }


    private void initListener() {
        buttonInsertDept.setOnClickListener(v -> {
            EntityDept dept = new EntityDept();
            dept.setDeptName("部门名称-" + indexDept);
            dept.setDeptNo(String.valueOf(indexDept));
            indexDept++;
            service.insertDept(dept)
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribeOn(Schedulers.io())
                    .subscribe(new CompletableObserver() {
                        @Override
                        public void onSubscribe(Disposable d) {

                        }

                        @Override
                        public void onComplete() {

                        }

                        @Override
                        public void onError(Throwable e) {

                        }
                    });

        });

        buttonDeleteDept.setOnClickListener(v -> {
            service.deleteDept(1)
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribeOn(Schedulers.io())
                    .subscribe(new CompletableObserver() {
                        @Override
                        public void onSubscribe(Disposable d) {

                        }

                        @Override
                        public void onComplete() {

                        }

                        @Override
                        public void onError(Throwable e) {

                        }
                    });
        });

        buttonUpdateDept.setOnClickListener(v -> {
            service.updateDeptName(2, "人事部")
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribeOn(Schedulers.io())
                    .subscribe(new CompletableObserver() {
                        @Override
                        public void onSubscribe(Disposable d) {

                        }

                        @Override
                        public void onComplete() {

                        }

                        @Override
                        public void onError(Throwable e) {

                        }
                    });
        });

        buttonQueryDept.setOnClickListener(v -> {
            service.findAllDept()
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribeOn(Schedulers.io())
                    .subscribe(new Observer<List<EntityDept>>() {
                        @Override
                        public void onSubscribe(Disposable d) {

                        }

                        @Override
                        public void onNext(List<EntityDept> entityDeptList) {
                            StringBuilder sb = new StringBuilder();
                            for (EntityDept dept : entityDeptList) {
                                sb.append(dept.getId()).append("\t");
                                sb.append(dept.getDeptNo()).append("\t");
                                sb.append(dept.getDeptName()).append("\n");
                            }
                            textViewShow.setText(sb);
                        }

                        @Override
                        public void onError(Throwable e) {

                        }

                        @Override
                        public void onComplete() {

                        }
                    });
        });

        buttonInsertEmployee.setOnClickListener(v -> {
            EntityEmployee employee = new EntityEmployee();
            employee.setName("员工名称-" + indexEmployee);
            employee.setAge(random.nextInt(20));
            employee.setEmployeeDeptId(random.nextInt(5));
            indexEmployee++;
            service.insertEmployee(employee)
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribeOn(Schedulers.io())
                    .subscribe(new CompletableObserver() {
                        @Override
                        public void onSubscribe(Disposable d) {

                        }

                        @Override
                        public void onComplete() {

                        }

                        @Override
                        public void onError(Throwable e) {

                        }
                    });
        });

        buttonDeleteEmployee.setOnClickListener(v -> {
            service.deleteEmployee(1)
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribeOn(Schedulers.io())
                    .subscribe(new CompletableObserver() {
                        @Override
                        public void onSubscribe(Disposable d) {

                        }

                        @Override
                        public void onComplete() {

                        }

                        @Override
                        public void onError(Throwable e) {

                        }
                    });
        });

        buttonUpdateEmployee.setOnClickListener(v -> {
            service.updateEmployeeName(2, "孙悟空")
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribeOn(Schedulers.io())
                    .subscribe(new CompletableObserver() {
                        @Override
                        public void onSubscribe(Disposable d) {

                        }

                        @Override
                        public void onComplete() {

                        }

                        @Override
                        public void onError(Throwable e) {

                        }
                    });
        });

        buttonQueryEmployee.setOnClickListener(v -> {
            service.findAllEmployee()
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribeOn(Schedulers.io())
                    .subscribe(new Observer<List<EntityEmployee>>() {
                        @Override
                        public void onSubscribe(Disposable d) {

                        }

                        @Override
                        public void onNext(List<EntityEmployee> entityEmployeeList) {
                            StringBuilder sb = new StringBuilder();
                            for (EntityEmployee employee : entityEmployeeList) {
                                sb.append(employee.getId()).append("\t");
                                sb.append(employee.getName()).append("\t");
                                sb.append(employee.getAge()).append("\t");
                                sb.append(employee.getEmployeeDeptId()).append("\n");
                            }
                            textViewShow.setText(sb);
                        }

                        @Override
                        public void onError(Throwable e) {

                        }

                        @Override
                        public void onComplete() {

                        }
                    });
        });
    }
}
```



### 第04节  效果图

第一张表 和 数据库地址

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/c-%E6%95%B0%E6%8D%AE%E5%BA%93/Snipaste_2024-07-30_14-25-18.png">



第二张表 和 布局UI

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/c-%E6%95%B0%E6%8D%AE%E5%BA%93/Snipaste_2024-07-30_14-29-25.png">



> 备注：
>
> ​	1、这里阅读数据库，采用的是 SQLiteStudio  
>
> ​	2、必须将 databases 当中的三个文件都导出，才能看到表结构
>
> 
>
> SQLiteStudio 的下载地址  
>
> <a href="https://github.com/pawelsalawa/sqlitestudio/releases">https://github.com/pawelsalawa/sqlitestudio/releases </a>













## 第二章 数据类

### 第01节 实体类（表）

表（部门）实体类

```java
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "t_dept")
public class EntityDept {

    // 主键 自增长
    @PrimaryKey(autoGenerate = true)
    private int id;

    // 用户名
    @ColumnInfo(name = "dept_name")
    private String deptName;

    // 部门编号
    @ColumnInfo(name = "dept_no")
    private String deptNo;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getDeptNo() {
        return deptNo;
    }

    public void setDeptNo(String deptNo) {
        this.deptNo = deptNo;
    }
}
```

表（员工）实体类

```java
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "t_employee")
public class EntityEmployee {

    // 主键 自增长
    @PrimaryKey(autoGenerate = true)
    private int id;

    // 员工姓名
    @ColumnInfo(name = "employee_name")
    private String name;

    // 员工年龄
    @ColumnInfo(name = "employee_age")
    private int age;

    // 所在部门的ID
    @ColumnInfo(name = "emp_dept_id")
    private int employeeDeptId;

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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getEmployeeDeptId() {
        return employeeDeptId;
    }

    public void setEmployeeDeptId(int employeeDeptId) {
        this.employeeDeptId = employeeDeptId;
    }
}
```





### 第02节 数据访问类（DAO）

```java
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

import java.util.List;


// DAO (Data Access Object) 提供了访问数据库的方法
@Dao
public interface EntityDao {

    // 增：添加部门信息
    @Insert
    void insertDept(EntityDept dept);

    // 删：删除数据
    @Query("DELETE FROM t_dept WHERE id = :deptId")
    void deleteDept(int deptId);

    // 改：修改数据
    @Query("UPDATE t_dept SET dept_name = :deptName WHERE dept_no = :deptNo")
    void updateDeptName(int deptNo, String deptName);

    // 查：查询数据
    @Query("SELECT * FROM t_dept")
    List<EntityDept> findAllDept();


    // 增：添加员工信息
    @Insert
    void insertEmployee(EntityEmployee employee);

    // 删：删除数据
    @Query("DELETE FROM t_employee WHERE id = :employeeId")
    void deleteEmployee(int employeeId);

    // 改：修改数据
    @Query("UPDATE t_employee SET employee_name = :employeeName WHERE id = :employeeId")
    void updateEmployeeName(int employeeId, String employeeName);

    // 查：查询数据
    @Query("SELECT * FROM t_employee")
    List<EntityEmployee> findAllEmployee();
}
```





### 第03节 数据Service层

接口

```java
import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public interface EntityService {

    // 增：添加部门信息
    Completable insertDept(EntityDept dept);

    // 删：删除数据
    Completable deleteDept(int deptId);

    // 改：修改数据
    Completable updateDeptName(int deptNo, String deptName);

    // 查：查询数据
    Observable<List<EntityDept>> findAllDept();


    // 增：添加员工信息
    Completable insertEmployee(EntityEmployee employee);

    // 删：删除数据
    Completable deleteEmployee(int employeeId);

    // 改：修改数据
    Completable updateEmployeeName(int employeeId, String employeeName);

    // 查：查询数据
    Observable<List<EntityEmployee>> findAllEmployee();
}
```

实现类

```java
import android.content.Context;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public class EntityServiceImpl implements EntityService {

    private Context context;

    public EntityServiceImpl(Context context) {
        this.context = context;
    }

    @Override
    public Completable insertDept(EntityDept dept) {
        return Completable.create(emitter -> {
            AppDataBase.getDataBase(context).entityDao().insertDept(dept);
            emitter.onComplete();
        });
    }

    @Override
    public Completable deleteDept(int deptId) {
        return Completable.create(emitter -> {
            AppDataBase.getDataBase(context).entityDao().deleteDept(deptId);
            emitter.onComplete();
        });
    }

    @Override
    public Completable updateDeptName(int deptNo, String deptName) {
        return Completable.create(emitter -> {
            AppDataBase.getDataBase(context).entityDao().updateDeptName(deptNo, deptName);
            emitter.onComplete();
        });
    }

    @Override
    public Observable<List<EntityDept>> findAllDept() {
        return Observable.create(emitter -> {
            List<EntityDept> list = AppDataBase.getDataBase(context).entityDao().findAllDept();
            emitter.onNext(list);
            emitter.onComplete();
        });
    }

    @Override
    public Completable insertEmployee(EntityEmployee employee) {
        return Completable.create(emitter -> {
            AppDataBase.getDataBase(context).entityDao().insertEmployee(employee);
            emitter.onComplete();
        });
    }

    @Override
    public Completable deleteEmployee(int employeeId) {
        return Completable.create(emitter -> {
            AppDataBase.getDataBase(context).entityDao().deleteEmployee(employeeId);
            emitter.onComplete();
        });
    }

    @Override
    public Completable updateEmployeeName(int employeeId, String employeeName) {
        return Completable.create(emitter -> {
            AppDataBase.getDataBase(context).entityDao().updateEmployeeName(employeeId, employeeName);
            emitter.onComplete();
        });
    }

    @Override
    public Observable<List<EntityEmployee>> findAllEmployee() {
        return Observable.create(emitter -> {
            List<EntityEmployee> list = AppDataBase.getDataBase(context).entityDao().findAllEmployee();
            emitter.onNext(list);
            emitter.onComplete();
        });
    }
}
```







### 第04节 RoomDataBase 类

```java
import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

// RoomDataBase
@Database(entities = {EntityDept.class, EntityEmployee.class}, version = 1)
public abstract class AppDataBase extends RoomDatabase {

    private static final String DATA_BASE_NAME = "my_database.db";
    private static volatile AppDataBase INSTANCE;

    // 获取到 EntityDao 的对象
    public abstract EntityDao entityDao();

    public static AppDataBase getDataBase(Context context) {
        if (INSTANCE == null) {
            synchronized (AppDataBase.class) {
                if (INSTANCE == null) {
                    INSTANCE = Room.databaseBuilder(context, AppDataBase.class, DATA_BASE_NAME).build();
                }
            }
        }
        return INSTANCE;
    }
}
```













