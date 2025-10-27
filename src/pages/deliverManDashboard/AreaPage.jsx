import AreaList from "@/layout/AreaList";
import { getAreas } from "@/utils/storage";
import { useNavigate } from "react-router-dom";

export default function AreaPage() {
  const areas = getAreas();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-sky-700">My Deliveries</h1>
        <p className="text-xs text-gray-500">Select area → colony → customer</p>
      </header>

      <AreaList
        areas={areas}
        onSelectArea={(area) =>
          navigate(`/delivery-dashboard/area/${area.id}/colonies`)
        }
      />
    </div>
  );
}
