const simpleGit = require('simple-git');
const git = simpleGit();

const OLD_EMAIL = 'wodus331@vanillacode.com';
const CORRECT_NAME = 'pjy';
const CORRECT_EMAIL = 'wodus331@gmail.com';

async function updateEmail() {
    try {
        const log = await git.log();

        for (const commit of log.all) {
            const commitHash = commit.hash;

            // Check if the commit matches the old email
            if (commit.author_email === OLD_EMAIL || commit.committer_email === OLD_EMAIL) {
                // Amend the commit with the new author and committer details
                await git.raw([
                    'commit', '--amend', '--no-edit', '--author',
                    `"${CORRECT_NAME} <${CORRECT_EMAIL}>"`,
                    '--date', commit.date, '--', ':/'
                ]);

                console.log(`Updated commit ${commitHash}`);
            }
        }

        // Push the changes to the remote repository
        await git.push('origin', 'HEAD', {'--force': null});
        console.log('Email update completed and pushed to the remote repository');
    } catch (err) {
        console.error('Error updating email:', err);
    }
}

updateEmail();