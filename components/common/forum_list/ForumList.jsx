import { connectDB } from '@/util/database'
import Image from 'next/image'
import myImage from '../../../public/images/2.jpg'
import myImages from '../../../public/images/1.png'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import styles from "./list.module.scss"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Send, BookmarkIcon } from 'lucide-react';



 const db = (await connectDB).db('forum(next)');
  const results = await db.collection('post').find().toArray(); 
  console.log(results);

function ForumList() {
  return (
    <>
        {results.map((item) => {
            return (
                <Card className="w-[600px] h-[700px]">
                <CardHeader>
                    <CardTitle className="h-[60px] flex items-center justify-between p-2">
                        <div className={styles.cardtitle__avatar}>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <span className={styles.cardtitle__avatar__name}>hojjang18@naver.com</span>
                        </div>
                        <Button ariant={"outline"} className=" flex bg-gray-300 p-3-5 font-extrabold text-black hover:bg-slate-200" >팔로우</Button>
                    </CardTitle>
                </CardHeader>

                <CardContent className="relative w-full h-[350px]">
                    <Carousel className="relative w-full h-full">
                        <CarouselContent className="h-[350px] w-full" >
                        <CarouselItem className="relative w-full h-full">
                            <Image
                                src={myImage}
                                alt="사진"
                                layout="fill"
                                objectFit="cover"
                                className="absolute inset-0"
                            />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-full">
                            <Image
                                src={myImages}
                                alt="사진"
                                layout="fill"
                                objectFit="cover"
                                className="absolute inset-0"
                            />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-full">
                            <Image
                                src={myImage}
                                alt="사진"
                                layout="fill"
                                objectFit="cover"
                                className="absolute inset-0"
                            />
                        </CarouselItem>
                        </CarouselContent>
                        <CarouselNext className="absolute top-[50%] right-3 transform -translate-y-1/2" />
                        <CarouselPrevious className="absolute top-[50%] left-3 transform -translate-y-1/2" />
                    </Carousel>
                </CardContent>


                <CardFooter className="w-full h-[250px] flex flex-col">
                    <div className={styles.cardfooter__top}>
                        <div className={styles.cardfooter__top__iconbox}>
                            <div className={styles.cardfooter__top__iconbox__icons}>
                                <Heart className="w-6 h-6" /> 
                                <MessageCircle className="w-6 h-6" />
                                <Send className="w-6 h-6" /> 
                            </div>
                            
                            <BookmarkIcon className="w-6 h-6" />
                        </div>
                        <p className={styles.cardfooter__top__like}>좋아요 9,511개</p>
                        <div className={styles.cardfooter__top__chat}>
                            <span className={styles.cardtitle__avatar__name}>hojjang18@naver.com</span>
                            <span className={styles.cardfooter__top__chat__content}>{item.content}</span>
                        </div>
                        <CardDescription className="cursor-pointer">...더보기</CardDescription>
                        
                    </div>

                    <div className={styles.cardfooter__bottom}>
                        <span className={styles.cardfooter__bottom__data}>1일 전</span>
                        <span className={styles.cardfooter__bottom__detail}>자세히 보기</span>
                    </div>
                </CardFooter>
                
            </Card>
            )
        })}
    </>

    
  )
}

export default ForumList