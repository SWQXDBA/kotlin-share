---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 更好的JVM编程语言 避免Java的设计缺陷
  text: The Better Java Kotlin
  tagline: 探索Kotlin在后端开发中的优势与最佳实践
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/introduction

features:
  - title: 空安全
    details: Kotlin的空安全机制帮助开发者避免空指针异常，提高系统稳定性
  - title: 现代
    details: 相比Java更简洁的语法，提高开发效率，代码更易读易维护
  - title: Java生态兼容
    details: 完全兼容Java生态系统，可以无缝使用现有的Java库和框架
---


---
## 你为什么在加班

Kotlin
```kotlin
fun grandFatherName(people:People?):String{
    return people?.father?.father?.name?:""
}

```

Java 
::: code-group

```java [按部就班]
public String grandFatherName(People people){
    if(people != null) {
        var father = people.getFather();
        if(father != null) {
            var grandFather = father.getFather();
            if(grandFather != null){
                var grandFatherName = grandFather.getName();
                if(grandFatherName != null) {
                    return grandFatherName;
                }
            }
        }
    }
    return "";
}
```

```java [CV大师]
public String grandFatherName(People people){
    if(people != null 
    && people.getFather() != null 
    && people.getFather().getFather() != null 
    && people.getFather().getFather().getName() != null){
        return people.getFather().getFather().getName();
    }
    return "";
}
```

```java [孤独一注]
public String grandFatherName(People people) {
	try {
		if (people.getFather().getFather().getName() != null) {
			return people.getFather().getFather().getName();
		}
	} catch (NullPointerException e) {
		return "";
	} 
	return "";
}
```
```java [相信前人的智慧]
public String grandFatherName(People people) {
	var name = people.getFather().getFather().getName();
	if(name != null){
	    return name;
	}
	return "";
}
Exception in thread "main" java.lang.NullPointerException
```

---
