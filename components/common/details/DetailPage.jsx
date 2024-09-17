'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./detail.module.scss";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Send, BookmarkIcon, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DetailPage({ item }) {
  const router = useRouter();

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const renderImages = () => (
    <>
      {item?.imgUrls?.map((img, index) => (
        <CarouselItem key={index} className="relative w-full h-full">
          <Image
            src={img}
            alt="사진"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            className="absolute inset-0"
            priority
          />
        </CarouselItem>
      ))}
    </>
  );

  return (
    <>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-70 flex" 
          onClick={toggleModal} />
          <div className="relative w-[1200px] max-w-full p-0 bg-white shadow-md rounded-lg flex">
            <Card className="w-[90%] h-[700px] border-none shadow-none">
              <CardHeader className="border-none">
                <CardTitle className="h-[60px] flex items-center justify-between p-2 border-none">
                  <div className={styles.cardtitle__avatar}>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png"/>
                      <AvatarFallback>{item.author}</AvatarFallback>
                    </Avatar>
                    <span className={styles.cardtitle__avatar__name}>{item.author}</span>
                  </div>
                  <Button variant="outline" className="flex bg-gray-300 p-3-5 font-extrabold text-black hover:bg-slate-200">
                    팔로우
                  </Button>
                </CardTitle>
              </CardHeader>

              <CardContent className="relative w-full h-[350px] border-none">
                <Carousel className="relative w-full h-full">
                  <CarouselContent className="h-[350px] w-full">
                    {renderImages()}
                  </CarouselContent>
                  <CarouselNext className="absolute top-[50%] right-3 transform -translate-y-1/2" />
                  <CarouselPrevious className="absolute top-[50%] left-3 transform -translate-y-1/2" />
                </Carousel>
              </CardContent>

              <CardFooter className="w-full h-[250px] flex flex-col border-none">
                <div className={styles.cardfooter__top}>
                  <div className={styles.cardfooter__top__iconbox}>
                    <div className={styles.cardfooter__top__iconbox__icons}>
                      <Heart className="w-6 h-6" />
                      <MessageCircle className="w-6 h-6 text-black" />
                      <Send className="w-6 h-6" />
                    </div>
                    <BookmarkIcon className="w-6 h-6" />
                  </div>
                  <p className={styles.cardfooter__top__like}>좋아요 1개</p>
                  <div className={styles.cardfooter__top__chat}>
                    <span className={styles.cardtitle__avatar__name}>{item.author}</span>
                    <Edit onClick={() => router.push(`/edit/${item.id}`)} className="cursor-pointer w-6 h-6" />
                    <span className={styles.cardfooter__top__chat__content}>{item.content}</span>
                  </div>
                </div>
                <div className={styles.cardfooter__bottom}>
                  <span className={styles.cardfooter__bottom__data}>1일 전</span>
                </div>
              </CardFooter>
            </Card>
            <Card className="w-[40%] h-[700px] border-none shadow-none ">
              <CardHeader className="text-center font-bold">
                <span className='text-xl'>댓글</span>
              </CardHeader>
            </Card>
          </div>
        </div>
    </>
  );
}
