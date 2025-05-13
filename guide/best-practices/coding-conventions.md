# Kotlin后端开发编码规范



本章介绍Kotlin后端开发的编码规范和最佳实践，帮助团队维护一致、高质量的代码库。

## 命名规范

### 包命名

Kotlin包的命名规范遵循反向域名模式，例如：

```kotlin
package com.example.myapp.feature
```

### 类和接口

- 类名使用PascalCase（首字母大写的驼峰式）
- 接口名通常不使用特殊前缀

```kotlin
class UserService
interface Repository
```

### 函数和变量

- 函数和变量名使用camelCase（首字母小写的驼峰式）
- 常量使用UPPER_SNAKE_CASE

```kotlin
fun processData()
val userName = "John"
const val MAX_COUNT = 100
```

## 代码结构

### 类结构布局

Kotlin类的推荐结构顺序：

1. 属性（先常量，再变量）
2. 初始化块
3. 构造函数和工厂方法
4. 公共方法
5. 内部方法
6. 嵌套类或接口

### 函数长度

单个函数不应过长，遵循单一职责原则。

## Kotlin特性使用指南

### 使用数据类

对于主要用于保存数据的类，应使用数据类：

```kotlin
data class User(val id: Long, val name: String, val email: String)
```

### 适当使用扩展函数

扩展函数应当明确其用途，避免过度使用：

```kotlin
// 好的扩展函数示例
fun String.toSlug() = this.lowercase().replace(" ", "-")
```

### 空安全处理

优先使用非空类型，必要时安全使用可空类型：

```kotlin
// 推荐的空安全处理方式
fun process(input: String?) {
    val value = input ?: return
    // 处理非空值
}
```

## 协程使用规范

### 协程作用域管理

明确管理协程作用域，避免泄漏：

```kotlin
class MyService {
    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())
    
    fun doWork() {
        scope.launch {
            // 长时间运行的任务
        }
    }
    
    fun cleanup() {
        scope.cancel() // 取消所有协程
    }
}
```

### 调度器选择

根据任务类型选择合适的调度器：

- IO密集型任务使用 `Dispatchers.IO`
- CPU密集型任务使用 `Dispatchers.Default`
- UI更新使用 `Dispatchers.Main`

## 单元测试准则

### 测试函数命名

测试函数名应明确说明测试用例：

```kotlin
@Test
fun `should return user when user exists`() {
    // 测试代码
}
```

### 使用特定的断言库

充分利用Kotlin友好的断言库：

```kotlin
// 使用kotest断言
result shouldBe expected
userList shouldHaveSize 2
```

## 文档和注释

### KDoc注释

为公共API添加KDoc文档：

```kotlin
/**
 * 计算给定数字的平方
 *
 * @param number 要计算平方的数字
 * @return 计算结果
 */
fun square(number: Int): Int = number * number
```

### 内部代码注释

对于复杂逻辑，添加清晰的注释说明。 
