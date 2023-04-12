import React from 'react'
import { Header } from 'semantic-ui-react'

const pageContent = {
  mv: {
    description: <p>This util is used to move around files. 
    If your source destination is an existing file/directory, it will overwrite with whatever your source is.</p>,
    example: `$ mv [ source path ] [ destination path ]`,
  },
  cp: {
    description: <p>This util is used to copy existing files. 
    The <code>-p</code> switch preserves the source's permissions. The <code>-r</code> switch, normally used with directories, recursively copies the directory and its content.</p>,
    example: `$ cp [ -p| -r ] [ source path ] [ destination path ]`,
  },
  ls: {
    description: <p>This util is used to list files/directories. 
      The <code>-la</code> switch includes hidden files in its listing along with the permissions.</p>,
    example: `ls [ -l | -a ] [ target directory/file ]`
  },
  rm: {
    description: <p>This util is used to remove files or directories. The <code>-rf</code> switch is <b>powerful</b>. It will forcefully remove 
    its target. Use this command with caution.</p>,
    example: `rm [ -r | -f ] [ target directory/file ]`
  }
}

const LinuxCommonCommands = () => (
  <div>

    {Object.keys(pageContent).map( (util, index) => [

      <Header as="h2" content={`${index + 1}. ${util}`} />,
      pageContent[util]['description'],
      <pre><code>{pageContent[util]['example']}</code></pre>

    ])}

  </div>
)

export default LinuxCommonCommands
