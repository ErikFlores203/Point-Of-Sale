import { generateClasses } from "@formkit/themes"



const config = {
    config: {
        classes: generateClasses({
            global:{
                message:'text-red-500',
                label: 'block mb-1 text-lg font-bold',
                wrapper: 'space-y-2, mb-2',
                input: 'w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400'
                
            },
            file: {
                noFiles: 'block my-2',
                fileItem: 'hidden'
            },
            submit: {
                input: '$reset bg-green-400 hover:bg-green-500 w-full p-2 font-bold uppercase disabled:opacity-50'
            }
        })
    }
}

export default config