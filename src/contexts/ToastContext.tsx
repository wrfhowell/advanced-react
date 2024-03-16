import { createContext, useContext, useState } from "react";
import { Toast } from "../components/Toast";

interface ToastContextInterface {
	toast: (message: string) => void;
}

interface ProviderInterface {
	children: React.ReactNode;
}

const ToastContext = createContext<ToastContextInterface>({
	toast: () => {},
});

export const useToastContext = () => useContext(ToastContext);

export const Providers = ({ children }: ProviderInterface) => {
	const [toastMessage, setToastMessage] = useState<string>("");
	const [toastOpen, setToastOpen] = useState<boolean>(false);

	const toast = (message: string) => {
		setToastOpen(true);
		setToastMessage(message);

		setTimeout(() => {
			setToastOpen(false);
			setToastMessage("");
		}, 300);
	};

	return (
		<ToastContext.Provider value={{ toast }}>
			<Toast message={toastMessage} open={toastOpen} />
			{children}
		</ToastContext.Provider>
	);
};
