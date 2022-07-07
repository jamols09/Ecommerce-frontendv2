import { useNotyf } from '../useNotyf'

/* Optional Notification */
class useNotificationType {
  notifType = (message: string, type: string) => {
    switch (type) {
      case 'warning':
        useNotyf().warning(message)
        break
      default:
        useNotyf().success(message)
        break
    }
  }
}

export default new useNotificationType()
