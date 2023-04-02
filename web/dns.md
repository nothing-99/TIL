# DNS

브라우저에 `www.example.com` 을 입력한 후 해당 서버에 HTTP-request를 보내기 전까지의 과정을 보자. 즉, HTTP-request를 보낼 **서버의 IP주소를 찾는 과정**이다. 

1. **브라우저는 캐시데이터에 도메인네임에 대한 IP주소가 존재하는지 확인한다.** 없으면 바로 DNS서버에 DNS query를 보내는 것이 아니다. 운영체제에 있는 DNS resolver에 보낸다. "stub resolver", "DNS client" 라고도 불린다.
2. **stub resolver는 자신의 캐시데이터를 확인한다.** 없으면 이제!! DNS recursive resolver(in ISP, Internet Service Provider)에 DNS query를 보낸다.
3. **recursive resolver는 캐시데이터를 확인한다.**
	1. **A record**의 존재 여부 : IP address를 가지고 있는 record
	2. NS record의 존재 여부 : A record를 가지고 있는 nameserver의 주소를 가지고 있는 record
	3. TLD server IP주소 존재 여부 : 해당 domain extention의 모든 domain을 관리하는 서버
4. recursive resolver -> (DNS query) -> **root nameserver** -> **(TLD server IP address)** -> recursive resolver
5. recursive resolver -> (DNS query) -> **TLD server** -> **(Authoritative nameserver IP address)** -> recursive resolver
6. recursive resolver -> (DNS query) -> **Authoritative nameserver** -> **(record)** -> recursive resolver
7. record 확인
	- **만약 A record인 경우**, DNS client에 전달
	- **만약 CNAME record인 경우**, CNAME record는 다른 도메인 네임을 가지고 있기 때문에 IP address를 찾기 위한 과정 다시 시작 -> 4
8. **recursive resolver는 캐시데이터에 해당 레코드를 저장하고 DNS client에게 DNS query에 대한 response를 보낸다.**
9. OS는 캐시데이터에 저장하고 브라우저에게 전달한다.
10. 브라우저는 이제 HTTP request의 목적지 주소를 알게됐다.