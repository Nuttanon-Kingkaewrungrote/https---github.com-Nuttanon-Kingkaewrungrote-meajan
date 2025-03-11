// /app/add-mtype/page.tsx
import AddMType from '../components/Addtype'



import MTypeList from '../components/typelist'

export default function AddMTypePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AddMType />
      <MTypeList /> {/* แสดงรายการประเภทและปุ่มลบ */}
    </div>
  )
}

