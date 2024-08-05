import create from 'zustand';

export const useChatStore = create((set) => ({
  chats: [],
  chatId: null,
  searchedUser: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  setChats: (chats) => set({ chats }),

  changeChat: (chatId) => {
    set((state) => {
      const chat = state.chats.find((c) => c.chatId === chatId);
      if (chat) {
        return {
          ...state,
          chatId,
          searchedUser: chat.searchedUser,
          isCurrentUserBlocked: chat.blocked?.isCurrentUserBlocked || false,
          isReceiverBlocked: chat.blocked?.isReceiverBlocked || false,
        };
      } else {
        return {
          ...state,
          chatId,
          searchedUser: null,
          isCurrentUserBlocked: false,
          isReceiverBlocked: false,
        };
      }
    });
  },

  changeBlock: () => {
    set((state) => ({
      ...state,
      isReceiverBlocked: !state.isReceiverBlocked,
    }));
  },
}));

export default useChatStore;
