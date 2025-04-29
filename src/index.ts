export * from './client/GrvtClient';
export * from './client/GrvtWsClient';
export * from './config/config';
export * from './types/deposit';

// Re-export the main client class as default
import { GrvtClient } from './client/GrvtClient';
export default GrvtClient;
