import { init, send } from 'emailjs-com'
import { serviceIdMailJs, templateIdMailJs, userIdMailJs } from '../../tokens'

export const initMailClient = () => {
  init(userIdMailJs)
}

export const sendEmail = async (event, { name, email, phone }, category, callback) => {
  try {
    event.preventDefault()
    await send(
      serviceIdMailJs,
      templateIdMailJs,
      {
        name,
        category,
        phone,
        email: email ? `или напиши ему на e-mail ${email}` : ''
      },
      userIdMailJs
    )

    if (callback) {
      callback()
    }
  } catch (error) {
    console.log(error)
  }
}
