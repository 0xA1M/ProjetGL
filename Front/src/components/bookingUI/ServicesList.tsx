/* Components */
import ServiceCard from "./serviceCard";

/* Utils */
import type { Category, Service } from "../../types/data";

interface Props {
  categories: Category[];
  services: Service[];
  selectedServices: Service[];
  onServiceSelect: (service: Service) => void;
}

const ServiceList = ({
  categories,
  services,
  selectedServices,
  onServiceSelect,
}: Props) => {
  return (
    <div>
      {categories.map((category, index) => (
        <div key={`${category}-${index}`} id={category.id}>
          <h2 className="text-2xl font-medium mb-4">{category.name}</h2>
          {services
            ?.filter((service) => service.categoryId === category.id)
            .map((service) => (
              <ServiceCard
                key={`${category}-${service.name}-${service.id}`}
                service={service}
                isSelected={selectedServices.some((s) => s.id === service.id)}
                onSelect={onServiceSelect}
              />
            ))}
          {services?.filter((service) => service.categoryId === category.id)
            .length === 0 && (
            <p className="pl-8 mb-4 text-gray-600">
              No services found for this salon in this category.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
