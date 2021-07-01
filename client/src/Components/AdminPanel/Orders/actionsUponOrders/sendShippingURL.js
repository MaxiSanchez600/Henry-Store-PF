import Swal from 'sweetalert2'

export default async function sendShippingURL () {
    const { value: shipping } = await Swal.fire({
        title: 'Ingresa el código de seguimiento',
        input: 'text',
        inputLabel: 'Inserte link aquí',
        buttonsStyling:false,
        iconColor: "#F64749",
        customClass:{
            popup:'popCreate',
            title:'titlePopCreate',
            confirmButton:'confirmBtnCreate',
            input:'inputPopCreate',
        },
        inputValidator: (value) => {
          if (!value) {
            return 'Necesitas enviar un link!'
          }
        }
      })
      if(shipping.isDismissed) return;
      if (shipping) {
          return shipping
      }
}