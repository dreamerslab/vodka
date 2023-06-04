/**
 * Module dependencies.
 * @private
 */
const { addSpaces } = require('./generator');

module.exports = (generators) => {
  let maxLen = 0;
  const help = ['Usage: vodka [command] [argument(s)]\n', 'Commands:'];
  const commands = [
    ['-v', '--version', 'Display vodka version'],
    ['h', 'help', 'Display usage information'],
    ['n', 'new [project]', 'Create a new test project']
  ];

  commands.forEach((cmd) => {
    if (cmd[1].length > maxLen) {
      maxLen = cmd[1].length;
    }
  });

  commands.forEach((cmd) => {
    help.push(
      `  ${addSpaces(cmd[0] + ',', 4)}${addSpaces(cmd[1], maxLen + 1)}${cmd[2]}`
    );
  });

  help.push('\nAvailable environment variables:');

  const vars = [
    ['BASE_DIR', 'Test project base directory', 'Default: `cwd`'],
    ['ROOT', 'Testing target host and port', 'Default: http://127.0.0.1:4000'],
    ['TIMEOUT', 'Request timeout', 'Default: 60000ms'],
  ];

  vars.forEach((cmd) => {
    if (cmd[1].length > maxLen) {
      maxLen = cmd[1].length;
    }
  });

  vars.forEach((cmd) => {
    help.push(
      `  ${addSpaces(cmd[0] + ':', 10)}${addSpaces(cmd[1], maxLen + 1)}${cmd[2]}`
    );
  });

  console.log(help.join('\n'));
};
