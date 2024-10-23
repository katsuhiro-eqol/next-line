

export default function StaffCard({key, item, setStaff}:{key:number, item:string, setStaff:(staff:string)=>void}){
    const card_click = () => {
        setStaff(item)
    }

    return (
        <div onClick={card_click} className="flex flex-col justify-center w-full h-20 bg-white rounded-lg shadow-lg mb-5">
        <div className="flex justify-between items-center px-5">
            <div key={key} className="text-center">{item}</div>
        </div>
        </div>
    )
}