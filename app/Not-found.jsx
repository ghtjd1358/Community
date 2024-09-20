const { notFound } = require("next/navigation");

import React from 'react'

export default function Notfound() {
  return (
    <div>{notFound()}</div>
  )
}
