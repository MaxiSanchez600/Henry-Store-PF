import Swal from 'sweetalert2'

export default async function sendShippingURL () {
    const { value: shipping } = await Swal.fire({
        title: 'Ingresa el código de seguimiento',
        input: 'text',
        inputLabel: 'Inserte link aquí',
        inputValidator: (value) => {
          if (!value) {
            return 'Necesitas enviar un link!'
          }
        }
      })
      if (shipping) {
          return shipping
      }
}