import Image from "next/image";

const HomeBaner = () => {
    return ( <div className="relative bg-gradient-to-r from-sky-500 to-sky-1000 mb-8">
        <div className="mx-auto px-6 py-8 flex flex-col gap-2 md:flex-row items-center justify-evenly">
            <div className="md-8 md:mb-0  text-center">
                <h1 className="text-4xl md:text-4xl font-bold text text-white">
                    Купуйте Завпчастини 
                </h1>
                <p className="text-lg md:text-2xl font-bold text-white mb-2">На всі моделі автомобілів PORSCHE</p>
                <p className="text-lg md:text-2xl font-bold text-white mb-2">На нашому сайті</p>

            </div>
            <div className="w-full md:w-1/3 relative aspect-video">
            <Image
            src='/banner-image.png'
            fill
            alt="Banner Image"
            className="object-contain"
            />
            </div>

        </div>
    </div> );
}
export default HomeBaner;