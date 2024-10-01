"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import styles from "./page.module.scss"
import MDEdiotr from "@uiw/react-md-editor"
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

    dispatch(fetchCreate(dataForm))

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
          className="mb-5 h-12"
        />
        <MDEdiotr
          value={content}
          onChange={setContent}
          height={680}
        />
        <Button type="submit" variant="outline" className="w-full h-[70px] mt-5">
          글 작성
        </Button>
      </form>
    </>
  )
}
