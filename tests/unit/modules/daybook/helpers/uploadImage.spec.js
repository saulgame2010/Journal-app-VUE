import 'setimmediate';
import cloudinary from 'cloudinary'
import axios from 'axios';
import uploadImage from '@/modules/daybook/helpers/uploadImage';

cloudinary.config({
    cloud_name: 'dlpglxhst',
    api_key: '915157496571725',
    api_secret: 'ExlFB82WhED2qLXK0yRNDSek0UE'
})

describe('Pruebas en el uploadImage', () => {
    test('Debe de cargar un archivo y retornar el URL', async() => { 
        const {data} = await axios.get('https://res.cloudinary.com/dlpglxhst/image/upload/v1682451785/wydbop0e0stci2uqckva.png', {
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'foto.png')
        const url = await uploadImage(file)
        expect(typeof url).toBe('string')

        // Tomar el id
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace(".png", "")
        await cloudinary.v2.api.delete_resources(imageId)
     })
})