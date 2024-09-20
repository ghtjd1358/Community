import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // console.log(request.nextUrl)  //유저가 요청중인 URL 출력
  // console.log(request.cookies)  //유저가 보낸 쿠키 출력
  // console.log(request.headers)  //유저의 headers 정보 출력 
  // NextResponse.next() 
  // NextResponse.redirect()  
  // NextResponse.rewrite()  

  const session = await getToken({req : request})
  console.log('미들웨어 세션', session)

  if(request.nextUrl.pathname === '/'){
    console.log(new Date())
    console.log(request.headers.get('sec-ch-ua-platform'))
  }

  if(request.nextUrl.pathname.startsWith('/write')){
    if(session === null){
      return NextResponse.redirect(new URL('http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F'), request.url)
    }
  }



} 