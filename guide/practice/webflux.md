# WebFlux开发

## 1. WebFlux简介

Spring WebFlux是Spring 5引入的响应式Web框架，它完全支持响应式编程模型。WebFlux的核心是响应式流（Reactive Streams）规范，它提供了处理异步数据流的标准化方式。

### 核心响应式类型

WebFlux主要使用以下响应式类型：
- `Mono<T>`: 表示0或1个元素的异步序列
- `Flux<T>`: 表示0到N个元素的异步序列

```kotlin
// Mono示例
val userMono: Mono<User> = userRepository.findById(1)

// Flux示例
val usersFlux: Flux<User> = userRepository.findAll()
```

## 2. Java中的WebFlux写法

在Java中，WebFlux通常使用链式API进行编程，这种方式虽然灵活，但代码可读性较差，错误处理也相对复杂：

```java
@RestController
public class UserController {
    private final UserService userService;
    private final ExternalService externalService;
    
    @GetMapping("/user/{id}")
    public Mono<UserDTO> getUser(@PathVariable Long id) {
        return userService.findUser(id)
            .flatMap(user -> externalService.getUserDetails(user.getId())
                .map(details -> new UserDTO(user, details)))
            .onErrorResume(e -> {
                if (e instanceof UserNotFoundException) {
                    return Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND));
                }
                return Mono.error(new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR));
            });
    }
}
```

这种写法的缺点：
1. 链式调用使代码难以阅读和维护
2. 错误处理需要额外的操作符
3. 调试困难
4. 代码结构复杂

## 3. Kotlin协程写法

Kotlin协程与WebFlux完美集成，可以使用挂起函数（suspend function）来简化代码：

```kotlin
@RestController
class UserController(
    private val userService: UserService,
    private val externalService: ExternalService
) {
    @GetMapping("/user/{id}")
    suspend fun getUser(@PathVariable id: Long): UserDTO {
        // 并行调用多个异步服务
        val user = userService.findUser(id)
        val details = externalService.getUserDetails(id)
        
        // 等待所有结果并组合
        return UserDTO(user, details)
    }
}

@Service
class UserService(private val userRepository: UserRepository) {
    suspend fun findUser(id: Long): User {
        return userRepository.findById(id) ?: throw UserNotFoundException(id)
    }
}

@Service
class ExternalService(private val webClient: WebClient) {
    suspend fun getUserDetails(id: Long): UserDetails {
        return webClient.get()
            .uri("/api/external/$id")
            .retrieve()
            .bodyToMono(UserDetails::class.java)
            .awaitSingle()
    }
}
```

Kotlin协程写法的优势：
1. 代码更简洁、更易读
2. 错误处理更自然，可以使用try-catch
3. 支持并行调用多个异步服务
4. 调试更容易
5. 代码结构更清晰

通过使用Kotlin协程，我们可以用更直观的方式编写响应式代码，同时保持WebFlux的所有优势。
