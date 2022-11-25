import Image from 'next/image'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export const notifySuccess = ({ title, body }: { title?: string, body: string }) => {
  toast.success(
    () => (
      <div className="relative">
        <div className="h-6 w-6 absolute notify__icon">
          <Image 
            src="/assets/images/success.svg" 
            alt="success"
            width={18}
            height={18}
          />
        </div>
        <div className="ml-4">
          <p className="notify__title font-bold">{title}</p>
          <div className="notify__body rounded-b-lg">{body}</div>
        </div>
      </div>
    ),
    {
      hideProgressBar: true,
      autoClose: 3000,
      theme: 'colored',
      icon: false,
      className: 'notify success',
      position: toast.POSITION.TOP_CENTER,
    },
  )
}

