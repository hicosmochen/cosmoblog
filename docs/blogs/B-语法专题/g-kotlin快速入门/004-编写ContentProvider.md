# 编写 ContentProvider









[[TOC]]





## 第一章 简单ContentProvider

```kotlin

import android.content.ContentProvider
import android.content.ContentValues
import android.content.Context
import android.content.UriMatcher
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import android.net.Uri
import androidx.core.net.toUri

// 写了一个类, 类名称是 DemoContentProvider 继承了 ContentProvider 类
class DemoContentProvider : ContentProvider() {

    // 因为知道 DatabaseHelper 和 SQLiteDatabase 一定会被初始化, 因此可以采用 lateinit 关键字
    private lateinit var dbHelper: DatabaseHelper
    private lateinit var database: SQLiteDatabase

    // 定义了一个内部接口常量, 包含有下面的一堆值。后续可以直接进行使用
    companion object {
        const val AUTHORITY = "com.xxx.xxx.provider"

        // 这里可以将 字符串,转换成为 URI
        val CONTENT_URI: Uri = "content:// xxxxxx".toUri()

        // 定义 const 定义了字面量常量的写法
        private const val USERS = 1
        private const val USER_ID = 2

        // 采用 apply 简化链式调用的写法
        private val uriMatcher = UriMatcher(UriMatcher.NO_MATCH).apply {
            addURI(AUTHORITY, "users", USERS)
            addURI(AUTHORITY, "users/#", USER_ID)
        }
    }


    // 定义了一个内部类 inner class 和普通类的写法一样, 直接添加了 inner 关键字
    private inner class DatabaseHelper(context: Context) :
        SQLiteOpenHelper(context, "MyDatabase.db", null, 1) {

        // 仔细观察下面的语法, 采用的是 """ 三个引号, 包裹的大段内容, 这种写法是  "原始字符串字面量" 也叫做 "三重引号字符串"
        // 可以用于处理大段落文字 文案 例如 SQL语句
        override fun onCreate(db: SQLiteDatabase) {
            db.execSQL(
                """
                CREATE TABLE users (
                    _id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT
                )
                """
            )
        }

        override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
            db.execSQL("DROP TABLE IF EXISTS users")
            onCreate(db)
        }
    }

    // 创建的方法
    override fun onCreate(): Boolean {
        // 因为知道 context 不为空, 所以直接采用 !! 表示一定不会为空
        dbHelper = DatabaseHelper(context!!)
        database = dbHelper.writableDatabase
        return database != null
    }

    // 查询的方法, 返回值是可以为null 的 Cursor 对象
    override fun query(
        uri: Uri,
        projection: Array<String>?,
        selection: String?,
        selectionArgs: Array<String>?,
        sortOrder: String?
    ): Cursor? {
        // 下面进行, 一系列的匹配操作
        return when (uriMatcher.match(uri)) {
            USERS -> database.query(
                "users",
                projection,
                selection,
                selectionArgs,
                null,
                null,
                sortOrder
            )

            USER_ID -> {
                val id = uri.lastPathSegment
                database.query(
                    "users",
                    projection,
                    "_id = ?",
                    arrayOf(id),
                    null,
                    null,
                    sortOrder
                )
            }

            // 当所有的情况都不满足的状态下, 采用的是 else 语句完成 最后的兜底操作
            else -> throw IllegalArgumentException("Unknown URI: $uri")
        }
    }

    // 重写的 getType 方法
    override fun getType(uri: Uri): String? {
        return when (uriMatcher.match(uri)) {
            USERS -> "vnd.android.cursor.dir/vnd.com.example.provider.users"
            USER_ID -> "vnd.android.cursor.item/vnd.com.example.provider.users"
            else -> throw IllegalArgumentException("Unknown URI: $uri")
        }
    }

    // 插入数据的方法, 返回的结果是 可以为 null 的 URI 对象
    override fun insert(uri: Uri, values: ContentValues?): Uri? {
        val id = when (uriMatcher.match(uri)) {
            USERS -> database.insert("users", null, values)
            else -> throw IllegalArgumentException("Unknown URI: $uri")
        }
        context?.contentResolver?.notifyChange(uri, null)
        return Uri.withAppendedPath(CONTENT_URI, id.toString())
    }

    // 删除数据的方法, 返回值是 Int 类型
    override fun delete(
        uri: Uri,
        selection: String?,
        selectionArgs: Array<String>?
    ): Int {
        return when (uriMatcher.match(uri)) {
            USERS -> database.delete("users", selection, selectionArgs)
            USER_ID -> {
                val id = uri.lastPathSegment
                database.delete("users", "_id = ?", arrayOf(id))
            }

            else -> throw IllegalArgumentException("Unknown URI: $uri")
        }.also { count ->
            if (count > 0) context?.contentResolver?.notifyChange(uri, null)
        }
    }

    // 更新数据的方法, 返回值是 Int 类型
    override fun update(
        uri: Uri,
        values: ContentValues?,
        selection: String?,
        selectionArgs: Array<String>?
    ): Int {
        return when (uriMatcher.match(uri)) {
            USERS -> database.update("users", values, selection, selectionArgs)
            USER_ID -> {
                val id = uri.lastPathSegment
                database.update("users", values, "_id = ?", arrayOf(id))
            }

            else -> throw IllegalArgumentException("Unknown URI: $uri")
        }.also { count ->
            if (count > 0) context?.contentResolver?.notifyChange(uri, null)
        }
    }
}
```







## 第二章 在 Activity 当中使用

清单文件中的定义

```xml
<provider
    android:name=".MyContentProvider"
    android:authorities="com.example.myapp.provider"
    android:exported="false" /> <!-- 设置为 false 表示仅限本应用访问 -->
```

在 Activity 进行使用

```java
val values = ContentValues().apply {
    put("name", "John Doe")
    put("email", "john@example.com")
}

contentResolver.insert(MyContentProvider.CONTENT_URI, values)
    val cursor = contentResolver.query(
    MyContentProvider.CONTENT_URI,
    arrayOf("_id", "name", "email"),
    null,
    null,
    null
)

    
cursor?.use {
    while (it.moveToNext()) {
        val id = it.getLong(0)
        val name = it.getString(1)
        val email = it.getString(2)
        Log.d("ContentProvider", "ID: $id, Name: $name, Email: $email")
    }
}
```



 
