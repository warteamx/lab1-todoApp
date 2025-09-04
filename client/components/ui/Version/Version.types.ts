export interface VersionProps {
  variant?: 'minimal' | 'detailed' | 'debug';
  style?: any;
  textStyle?: any;
  showBuildDate?: boolean;
  showCommitHash?: boolean;
  showEnvironment?: boolean;
}
