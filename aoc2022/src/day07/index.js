import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

class FileNode {
  constructor(name, parent, isDirectory) {
    this.name = name
    this.parent = parent
    this.isDirectory = isDirectory
    this.size = 0
  }
}

function createFileSystemStructure(allFiles, dataInput) {
  let currentNode = new FileNode('/', null, true);
  for (let i = 1; i < dataInput.length; i++) {
    if (dataInput[i].startsWith('dir ')) {
    } else if (dataInput[i] === '\$ cd ..') {
      currentNode = currentNode.parent;
    } else if (dataInput[i].startsWith('\$ cd ')) {
      const directory = new FileNode(`${currentNode.name}/${dataInput[i].split(' ')[2]}`, currentNode, true);
      allFiles.push(directory);
      currentNode = directory;
    } else if (dataInput[i] !== '\$ ls') {
      const justAFile = new FileNode(dataInput[i].split(' ')[1], currentNode, false);
      justAFile.size = Number.parseInt(dataInput[i].split(' ')[0]);
      allFiles.push(justAFile);
    }
  }
}


function updateDirectorySizes(files) {
  for (let i = 0; i < files.length; i++) {
    if (!files[i].isDirectory) {
      let parent = files[i].parent;
      while(parent != null) {
        parent.size += files[i].size;
        parent = parent.parent;
      }
    }
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const files = []
  createFileSystemStructure(files, input);
  updateDirectorySizes(files)
  const smallerDirectories = files.filter((element) => element.isDirectory && element.name !== '/' && element.size < 100000).map((element) => element.size)
  return smallerDirectories.reduce((acc, value) => value + acc, 0)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const files = []
  createFileSystemStructure(files, input)
  updateDirectorySizes(files)
  const largerDirectories = files.filter((element) => element.isDirectory && element.size >= 4804833).map((element) => element.size)
  largerDirectories.sort((a,b) => a-b)
  return largerDirectories[0]
}

run({
  part1: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
