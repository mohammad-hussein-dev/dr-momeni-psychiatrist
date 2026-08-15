/**
 * Chat store facade for backward compatibility.
 * Delegates to modular domain service in src/features/chat/services/chatService.ts
 */
import { ChatMessage, PatientThread } from '../types';
import { chatService, CHAT_MESSAGES_KEY as MSG_KEY } from '../features/chat/services/chatService';

export const CHAT_MESSAGES_KEY = MSG_KEY;

export function getAllMessages(): ChatMessage[] {
  return chatService.getAllMessages();
}

export function getAllChatMessages(): ChatMessage[] {
  return chatService.getAllMessages();
}

export function getMessagesByPhone(patientPhone: string): ChatMessage[] {
  return chatService.getMessagesByPhone(patientPhone);
}

export function getMessagesForPatient(patientPhone: string): ChatMessage[] {
  return chatService.getMessagesByPhone(patientPhone);
}

export function getAllPatientThreads(): PatientThread[] {
  return chatService.getPatientThreads();
}

export function getPatientThreads(): PatientThread[] {
  return chatService.getPatientThreads();
}

export function sendChatMessage(params: {
  patientPhone: string;
  patientName?: string;
  sender: 'doctor' | 'patient';
  senderName?: string;
  text: string;
  attachmentType?: ChatMessage['attachmentType'];
  attachmentTitle?: string;
  attachmentData?: string;
  voiceDurationSeconds?: number;
}): ChatMessage {
  return chatService.sendChatMessage(params);
}

export function markMessagesAsRead(patientPhone: string, reader: 'doctor' | 'patient'): void {
  chatService.markMessagesAsRead(patientPhone, reader);
}

export function markThreadAsRead(patientPhone: string): void {
  chatService.markMessagesAsRead(patientPhone, 'doctor');
}

export function toggleMessageReaction(messageId: string, emoji: string, by: 'doctor' | 'patient', name?: string): boolean {
  return chatService.toggleMessageReaction(messageId, emoji, by, name);
}

export function editChatMessage(messageId: string, newText: string): boolean {
  return chatService.editChatMessage(messageId, newText);
}

export function deleteChatMessage(messageId: string): boolean {
  return chatService.deleteChatMessage(messageId);
}

export function resetChatsToDefaults(): ChatMessage[] {
  return chatService.resetChatsToDefaults();
}

