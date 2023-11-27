import {create} from 'zustand';

export const sidebarToggle = create((set) => ({
    isOpenSidebar: false,
    setIsOpenSidebar: () => set({isOpenSidebar: true}),
    setIsCloseSidebar: () => set({isOpenSidebar: false})
}));


export const profileToggle = create((set) => ({
    isOpen: false,
    setIsOpen: () => set((state) => ({isOpen: !state.isOpen}))
}));


export const notificationToggle = create((set) => ({
    isOpen: false,
    setIsOpen: () => set((state) => ({isOpen: !state.isOpen}))
}));

