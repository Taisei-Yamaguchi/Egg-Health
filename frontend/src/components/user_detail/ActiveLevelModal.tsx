import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaWalking, FaRunning, FaDumbbell, FaBiking, FaSwimmer } from 'react-icons/fa';

type ActiveLevelModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    activeLevel: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
};

const ActiveLevelModal: React.FC<ActiveLevelModalProps> = ({ isOpen, closeModal, activeLevel, setFieldValue, handleBlur }) => {
    const levels = [
        { value: 'very low', label: 'No Exercise', description: 'Little to no exercise.', icon: <FaWalking className="w-6 h-6 mr-2 text-green-600" /> },
        { value: 'low', label: 'Rare Exercise', description: 'Light exercise or sports 1-3 days a week.', icon: <FaRunning className="w-6 h-6 mr-2 text-green-600" /> },
        { value: 'middle', label: 'Moderate Exercise', description: 'Moderate exercise or sports 3-5 days a week.', icon: <FaDumbbell className="w-6 h-6 mr-2 text-green-600" /> },
        { value: 'high', label: 'Frequent Exercise', description: 'Hard exercise or sports 6-7 days a week.', icon: <FaBiking className="w-6 h-6 mr-2 text-green-600" /> },
        { value: 'very high', label: 'Daily Exercise', description: 'Very hard exercise or physical job.', icon: <FaSwimmer className="w-6 h-6 mr-2 text-green-600" /> },
    ];

    const handleChange = (value: string) => {
        setFieldValue('active_level', value);
        handleBlur({ target: { name: 'active_level' } } as any);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black opacity-30" />
                    </Transition.Child>

                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <div className="flex justify-between items-center">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Select Activity Level
                                </Dialog.Title>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-500"
                                    onClick={closeModal}
                                >
                                    <span className="sr-only">Close</span>
                                    &#x2715;
                                </button>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                                This activity level will be used to calculate your daily calorie goals when setting weight targets. It is also used to estimate 'other calories' since it is difficult to fully track all calorie consumption. Additionally, it is utilized in various calculations based on your body information. Please select the one that best describes you from the options below.
                            </div>
                            <div className="mt-4 space-y-4">
                                {levels.map(level => (
                                    <div key={level.value} className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            id={level.value}
                                            name="active_level"
                                            value={level.value}
                                            checked={activeLevel === level.value}
                                            onChange={() => handleChange(level.value)}
                                            className="form-radio"
                                        />
                                        <label htmlFor={level.value} className="flex items-center space-x-2">
                                            {level.icon}
                                            <span className="font-medium">{level.label}</span>
                                            <span className="text-sm text-gray-500">{level.description}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ActiveLevelModal;
