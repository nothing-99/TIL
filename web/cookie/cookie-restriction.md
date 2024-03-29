# Cookie restriction

쿠키에 대한 악용을 방지하고 브라우저와 서버를 보호하기 위해 여러가지 제한을 두고 있다. 이러한 제한들로 웹사이트는 과도한 데이터를 저장하지 않고 성능을 유지할 수 있다.

- **도메인 당 쿠키 최대 수** : 브라우저마다 상이하다
- **도메인 당 쿠기의 최대 크기** : 브라우저마다 다르지만 일반적으로 4KB로 설정되어 있다.

브라우저마다 도메인 당 가질 수 있는 최대 쿠키 수가 다른데 이것으로 인해 문제가 발생할 수 있다.

특정 사이트는 40개의 쿠키를 사용한다고 가정해본다. 40개 이상의 최대 쿠키 수를 가질 수 있는 브라우저에서는 문제가 없겠지만 그 이하의 최대 쿠키 수를 가지는 브라우저에서는 **일부 쿠키가 누락되는 문제가 발생**할 수 있다. ( 쇼핑카트 항목 누락, 로그인 세션 끊김 ) 개발자는 **이 점을 고려해서 쿠키 사용을 최적화**해야 할 필요가 있다.
