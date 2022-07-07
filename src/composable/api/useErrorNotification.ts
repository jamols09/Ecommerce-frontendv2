import { useNotyf } from '../useNotyf'
const notif = useNotyf()
class useErrorNotification {
  error({ errors, error }: any) {
    console.log(errors)
    try {
      if (error) {
        notif.error(error)
      } else {
        const result = Object.keys(errors).map((key) => errors[key])
        result.forEach((e) => {
          if (e.length > 1) {
            e.forEach((element: any) => {
              notif.error(`${element}`)
            })
            return
          }
          notif.error(`${e}`)
        })
      }
    } catch (err) {
      console.error(err)
      notif.error(`${err}`)
    }

    // for (let a = 0; a < result.length; a++) {
    //   if (result[a].length > 1) {
    //     for (let b = 0; b < result[a].length; b++) {
    //       notif.error(`${result[b]}`)
    //     }
    //     return
    //   }
    //   notif.error(`${a}`)
    // }
  }
}

export default new useErrorNotification()
