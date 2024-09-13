"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import styles from "./page.module.scss"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchCreate } from "@/redux/features/forumSlice"
import { useRouter } from "next/navigation"

export default function WriteForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const postHandler = async (e) => {
    e.preventDefault();
    const dataForm = {
      title: title,
      content: content
    }

    await dispatch(fetchCreate(dataForm))

    setTitle('')
    setContent('')

    alert('글이 작성되었습니다.')
    router.push('/')
  }

  return (
    <>
      <form className={styles.form} onSubmit={postHandler}>
        <Input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="mb-4"
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className="mb-4 h-[700px] p-2 text-left border border-rgb(229, 229, 229) rounded-md"
          style={{ textAlign: "left", verticalAlign: "top" }}
        />
        <Button type="submit" variant="outline" className="w-full h-[70px]">
          글 작성
        </Button>
      </form>
    </>
  )
}
