import { useState } from 'react';

const useCaptcha = () => {
    const [captcha, setCaptcha] = useState('');

    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * charactersLength);
          result += characters.charAt(randomIndex);
        }
        
        setCaptcha(result)
      };
      return {captcha,generateCaptcha}
}

export default useCaptcha