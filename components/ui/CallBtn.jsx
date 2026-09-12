'use client '

import { ArrowRight } from "lucide-react"
import MainButton from "./MainButton"

export default function CallBtn(){
   return <MainButton
                 onClick={() => (window.location.href = "tel:+1234567890")}
                className="flex justify-center items-center mt-8  w-auto  gap-2 bg-primary px-7 py-3 text-white"
              >
                Call us
                <ArrowRight className="h-4 w-4" />
              </MainButton>
}