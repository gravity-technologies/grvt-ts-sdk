# Github Action Scripts

This folder is used to create scripts for usage in github actions.

## Onboarding new script

To onboard a new script, you need to give git permissions to execute the new script. [See Discussion](https://github.com/orgs/community/discussions/26239)

```bash
git update-index --chmod=+x ./.github/scripts/assert_no_files_changed.sh
```
