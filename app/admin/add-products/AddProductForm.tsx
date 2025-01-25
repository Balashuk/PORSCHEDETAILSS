"use client"

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import FirebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import{getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType={
    color:string;
    colorCode: string;
    image: File|null;
}
export type UploadedImageType={
    color:string;
    colorCode: string;
    image: string;
}

const AddProductForm = () => {

    const router =useRouter()
    const [isLoading, setIsLoading]=useState(false)
    const [images, setImages]=useState<ImageType[]|null>()
    const [isProductCreated, setIsProductCreated]=useState(false)


    const {register , handleSubmit ,setValue,watch,reset,formState:{errors}}=useForm<FieldValues>({
        defaultValues:{
            name:"",
            description:"",
            brand:"",
            category:"",
            inStock:false,
            images:[],
            price:"",

        }
    })

    useEffect(()=>{
        setCustomValue("images",images)
    },[images])
    if(isProductCreated){
        reset();
        setImages(null);
        setIsProductCreated(false);
    }
    useEffect(()=>{

    },[isProductCreated])

    const onSubmit:SubmitHandler<FieldValues> = async(data)=>{
        console.log("Product data",data)

        setIsLoading(true)
        let uploadedImages:UploadedImageType[]=[]
        if(!data.category){
            setIsLoading(false)
            return toast.error("Категорія не вибрана")
        }

        if(!data.images||data.images.length===0){
            setIsLoading(false)
            return toast.error("No selected images")
        }

        const handleImageUploads=async ()=>{

            toast("Товар створюється зачекайте...");
            try {
                for(const item of data.images){
                    if(item.image){
                        const fileName= new Date().getTime()+"-"+item.image.name;
                        const storage= getStorage(FirebaseApp)
                        const storageRef=ref(storage,`products/${fileName}`);
                        const uploadTask=uploadBytesResumable(storageRef,item.image);

                        await new Promise<void>((resolve,reject)=>{
                            uploadTask.on(
                                "state_changed",
                                (snapshot) =>{
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                    case 'running':
                                        console.log('Upload is running');
                                        break;
                                    }
                                },
                                (error) => {
                                    console.log("Error update image",error)
                                    reject(error)
                                }, 
                                () => {
                                    
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    uploadedImages.push({
                                        ...item,
                                        image:downloadURL
                                    })
                                    console.log('File available at', downloadURL);
                                    resolve()
                                    }).catch((error)=>{
                                        console.log("URL ERROR",error)
                                        reject(error)

                                    });
                                }

                            )

                        })
                        
                    }
                }

            } catch(error){
                setIsLoading(false)
                console.log("Error handing image uploads",error)
                return toast.error("Error handing image uploads")
    
            }
        };
        await handleImageUploads();
        const productData={...data,images:uploadedImages}
        
        axios.post('/api/product',productData).then(()=>{
            toast.success("Товар створено");
            setIsProductCreated(true);
            router.refresh();
        }).catch((error)=>{
            toast.error("Someting went wrong saving product to db")
        }).finally(()=>{
            setIsLoading(false)
        })

    }

    const category = watch("category");
    const setCustomValue =(id:string, value:any)=>{
        setValue(id,value,{
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true,
        })
    }

    const addImageToState=useCallback((value:ImageType)=>{
        setImages((prev)=>{
            if(!prev){
                return[value]
            }

            return[...prev,value]
        })
    },[])
    const removeImageFromState=useCallback((value:ImageType)=>{
        setImages((prev)=>{

            if(prev){
                const filteredImages=prev.filter((item)=>item.color !==value.color)
                return filteredImages;
            }

            return prev
        })
    },[])

    return ( <>
    <Heading title="Додавання товару" center/>
    <Input
    id="name"
    label="Назва товару"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />
    <Input
    id="price"
    label="Ціна грн"
    disabled={isLoading}
    register={register}
    errors={errors}
    type="number"
    required
    />
    <Input
    id="brand"
    label="Деталь"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />
    <TextArea
    id="description"
    label="Опис"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />
    <CustomCheckBox id="inStock" register={register} label="Цей товар в наявності"/>
    <div className="w-full font-medium">
        <div className="mb-2 font-semibold">
            Виберіть модель автомобіля
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
        {categories.map((item)=>{
            if(item.label==="All"){
                return null;
            }
            return <div key={item.label} className="col-span">
                <CategoryInput onClick={(category)=>setCustomValue("category", category)}
                    selected={category===item.label}
                    label={item.label}
                    icon={item.icon}/>
            </div>
        })}
        </div>
    </div>
    <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
            <div className="font-bold">
                Виберіть кольор товару та продовжіть редактування
            </div>
            <div className="text-sm">
                Загрузіть фото товару в елемент кольору
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
            {colors.map((item,index)=>{
                return <SelectColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={isProductCreated}/>
            })}
        </div>
    </div>
    <Button label={isLoading?"Завантаження..." :"Додати товар"} onClick={handleSubmit(onSubmit)}/>
    </> );
}
 
export default AddProductForm;