# HTTP
communication protocol인 TCP/IP는 **Link**, **Internet**, **Transport**, **Application** 으로 나눠져있다. 클라이언트, 서버와 직접적으로 맞닫는 층은 TCP/IP의 최상단 층에 해당하는 Application 층이고 Application protocol에 해당하는 것이 바로 HTTP이다. 즉, HTTP는 Communication protocol인 TCP/IP의 최상단에 위치한 Application protocol에 해당한다.

[TCP/IP | wiki](https://en.wikipedia.org/wiki/Internet_protocol_suite)

HTTP는 HTTP-messages를 통해 client와 server가 communication을 한다. client가 server에게 보내는 HTTP-message는 **request**이고 server가 client에게 보내는 HTTP-message는 **response**이다. ( http를 통한 communication은 항상 request가 먼저이고 request는 client에 의해 만들어진다. 보통 client는 우리가 사용하는 브라우저로 보면 된다 )

> **[NOTE]** HTTP messages : { request, response }
> Client -> (Request) -> Server -> (Response) -> Client

> **[NOTE]** URI
> 웹에서 각 resource들은 어떻게 구분할까? 이것을 해결해주는 존재가 바로 URI이다. URI는 resource에 대한 식별자이며 접근을 위한 경로이다.

## HTTP request
```http
GET / HTTP/1.1
Host: www.opera.com
Accept-Language: en
```
- GET : **HTTP method**
- / : **resources 접근을 위한 경로**
- HTTP/1.1 : HTTP version
- Host, Accept-Language : **HTTP header**

HTTP header는 request에 포함된 정보이다. server는 request를 받으면 HTTP header를 보고 request의 의도에 맞게 response를 구성한다. (당연히 response에도 http header가 존재함)

HTTP method는 request가 어떠한 동작을 원하는지를 말한다. OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 8가지가 있고 각각이 다른 동작을 한다. [HTTP method](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-p2-semantics#section-4-3)

## HTTP response
HTTP request는 HTTP method를 통해 어떠한 동작을 하는지 나타내지만 HTTP response는 status code로 어떤 결과인지 나타낸다. status code는 HTTP response의 가장 첫째줄 status-line에 포함된다.
```http
HTTP/1.1 200 OK
```
- HTTP/1.1 : HTTP version
- 200 : **status code**
- OK : explanation (optional)

> **[NOTE]** status line
> [http protocol version][ ][status code][ ][explanation sentence]

#### 200, ok - everything is fine!
server는 client의 request를 완전히 이해했다면 **200**의 status-code를 가진 status-line으로 시작하는 response를 구성해 보낼 것이다. server는 HTTP request에 따라서 HTTP response에 Page's content도 같이 보낸다. (도달한 request에 따라 유연하게 response를 보낸다)

### 307, moved temporarily elsewhere
```http
HTTP/1.1 307 Temporary Redirect
Location: http://meteo.example.org/taiwan/weather/crisis
```

307은 "해당 주소는 잠시 사용하지 않고 여기가 임시 주소야" 라고 말한다. 브라우저는 자동으로 새로운 Location으로 GET method를 포함한 HTTP request를 보낼 것이다. 하지만 일반 유저는 리다이렉션됨을 모른채로 편안하게 사용할 수 있을 것이다. (클릭해서 이동할 수 있는 페이지를 보내줌으로써 리다이렉션됨을 보여줄 수 있을듯?)

### 301, address changed permanently
301은 "해당 주소는 더 이상 사용하지 않고 여기가 새로운 주소야" 라고 말한다.
```http
HTTP/1.1 301 Moved Permanently
Location: http://inc.example.com/section/electronic/about
```

> **[NOTE]** 307 vs 301
> 307은 임시이지만 301은 완전한 이사이다. 그렇기 때문에 북마크에 기존 URI에 대해서 저장되어 있다면 새로운 URI로 세팅해준다.

### 410, this is the end - my only friend, the end
401은 "해당 주소에 존재했던 content가 제거됐어!!" 라고 말한다.
```http
HTTP/1.1 410 Gone
```

### 500, i have a bad feeling about this
500은 "이유를 몰라 request에 대한 답을 할 수 없어!" 라고 말한다.
```http
HTTP/1.1 500 Internal Server Error
```

### HTTP codes
- 1xx : informational
- 2xx : successful
- 3xx : redirection
- 4xx : client error
- 5xx : server error


## 참고
- [HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP)
- [Dev.Opera — HTTP — an Application-Level Protocol](https://dev.opera.com/articles/http-basic-introduction/)
- [Dev.Opera — HTTP: Let’s GET It On!](https://dev.opera.com/articles/http-lets-get-it-on/)
- [Dev.Opera — HTTP: Response Codes](https://dev.opera.com/articles/http-response-codes/)
---
[[프론트엔드]] 