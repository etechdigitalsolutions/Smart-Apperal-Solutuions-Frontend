import AdminPanel from "@/components/admin/AdminPanel";
import ProductForm from "@/components/admin/forms/ProductForm";
interface Props { params: Promise<{ id: string }>; }
export default async function EditProductPage({ params }: Props) { const { id } = await params; return <AdminPanel title={`Edit product ${id}`} description="Update product information and availability."><ProductForm /></AdminPanel>; }
