interface IFileSegment {
  firstCluster: number; // address of the first cluster
  length: number; // in clusters
}

export interface IFile {
  size: number; // in bytes
  numberOfSegments: number;
  segments: IFileSegment[];
}
