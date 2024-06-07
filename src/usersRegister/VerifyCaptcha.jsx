import React from 'react'
import CaptchaCode from '../components/CaptchaCode'

function VerifyCaptcha({setCaptchaVerified}) {
  return (
    <div>
        <CaptchaCode setCaptchaVerified={setCaptchaVerified}></CaptchaCode>
    </div>
  )
}

export default VerifyCaptcha