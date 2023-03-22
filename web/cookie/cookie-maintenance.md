# Cookie - Cookie maintenance and lifecycle

```http
Set-Cookie: name=pepe; domain=pepe.net; path=/foo
```

최초 웹사이트에 들어온 요청에 대한 응답할 때 쿠키 정보를 전달했다. 이후 쿠키값이나 옵션값의 변경을 원한다면 간단히 새로운 쿠키 정보를 넘겨주면 된다.

```http
Set-Cookie: name=rare; domain=pepe.net; path=/foo
```

원래의 쿠키 값으로 **name=rare**를 가지는 새로운 쿠키로 덮어쓴다.

> 👀 `Secure` OPTION
> HTTPS 연결을 통해서만 쿠키를 전송하도록 하는 옵션이다. 쿠키를 악용하는 공격으로부터 보호하기 위해 HTTPS 연결을 하도록 Secure 옵션을 설정하는 것이 좋다.

```http
Set-Cookie: name=pepe; domain=pepe.net; path=/
```

"Path옵션만 다른" 쿠키 정보를 전달했다. **새로운 쿠키가 생성**된다.

```http
Cookie: name=rare; name=pepe
```

`www.pepe.net` 에 대한 요청을 보낼 때 위의 Cookie헤더가 포함된다.
Cookie 문자열의 순서는 **Domain - Path - Secure 옵션값이 구체적인 순**으로 정해진다.

```http
Set-Cookie: name=y00tz
```

`www.pepe.net/foo`에서 새로운 쿠키 정보를 전달하는 예이다. 이 쿠키는 value `name=y00tz`, domain `www.pepe.net`, path `/foo` 을 가진다. 브라우저가 `www.pepe.net/foo` 에 쿠키 헤더를 보낼 때 문자열 순서는 구체적인 순으로 나열된다.

```http
Cookie: name=y00tz; name=rare; name=pepe
```

## 쿠키 만료 날짜 변경

쿠키를 식별할 때, { Name, Domain, Path. Secure } 을 비교해서 찾는다. 여기서 Expires 는 비교대상이 아니였다.

```http
Set-Cookie: name=rare; expires=Sat, 03 May 2025 17:44:22 GMT
```

```http
Set-Cookie: name=pepe
```

쿠키값은 pepe로 변경되지만 expires는 변동없을 것이다. 왜냐하면 expires는 쿠키를 식별하기 위한 데이터가 아니기 때문이다.

Expires를 변경할 때는 쿠키를 식별하기 위해 { Name, Domain, Path, Secure } 를 일치시키고 변경된 Expires 를 설정하면 된다.

만료 날짜를 설정하지 않거나, 만료 날짜가 너무 길거나 짧을 경우, 쿠키의 안전성이 저하될 수 있기 때문에 적절하게 설정하고 보안상의 이유로 HTTPS 연결을 사용하도록 해야 한다.

쿠키는 서버에서 브라우저로 보내는 텍스트 데이터이고 쿠키가 브라우저 캐시에 저장되는 동안 브라우저가 쿠키의 유통기한을 확인한다. 이때, 서버의 시간과 브라우저의 시간이 다를 경우 문제가 발생할 수 있다.

서버의 시간이 브라우저의 시간보다 느릴 경우 브라우저의 시간보다 이전의 시간으로 만료 기한이 설정된 쿠키가 왔을 때 사용자는 원활한 사용을 하지 못할 수 있다.

- **서버 시간과 클라이언트 시간 차이를 고려한 유통 기한을 설정해야 한다**
- **서버의 시간과 클라이언트 시간을 일치시키기 위해 서버와 클라이언트의 시간을 NTP(Network Time Protocol)를 이용해 동기화시키는 것이 좋다**
