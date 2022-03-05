export const usePrCheckUtils = () => {
  const REVIEW_PASS_LABEL = 'ReviewPass';
  const DEV_LABEL = 'dev';
  const STG_LABEL = 'stg';
  const UT_LABEL = 'ut';
  const devMessageRegex = /^\[DEV\d{6}\].*/;
  const ngMessageRegex = /^\[SP\d{3}_NG\d{4}\].*/;

  /**
   * 
   * @param {Object} milestone 
   * @param {String} sprint 
   */
  const checkMilestone = ({ milestone }, sprint) => {
    const title = milestone && milestone.title;
    if (title !== sprint) {
      throw `Milestone is invalid. expected: ${sprint}, actual: ${title}`;
    }
  };

  /**
   * 
   * @param {Array} labels 
   * @param {String} ref
   */
  const checkLabel = ({ labels, base: { ref }}) => {
    const labelTitles = labels.map(label => label.name);

    // check ReviewPass label
    if (!labelTitles.includes(REVIEW_PASS_LABEL)) {
      throw 'No ReviewPass.';
    }

    // check base branch label
    const baseBranch = ref;
    if (baseBranch === 'develop' && !labelTitles.includes(DEV_LABEL)) {
      throw 'Base branch is develop but no dev label.';
    } else if (baseBranch === 'release-stg' && !labelTitles.includes(STG_LABEL)) {
      throw 'Base branch is release-stg but no stg label.';
    } else if (baseBranch === 'release-stg01' && !labelTitles.includes(UT_LABEL)) {
      throw 'Base branch is release-stg01 but no ut label.';
    }
  };

  /**
   * 
   * @param {Array} commitData 
   */
  const checkCommitMessages = commitData => {
    for (var j = 0; j < commitData.length; j++) {
      const commitMessage = commitData[j].commit.message;
      if (!commitMessage.match(devMessageRegex) && !commitMessage.match(ngMessageRegex)) {
        throw `Commit message format is invalid. commitMessage: ${commitMessage}`;
      }
    }
  };

  return {
    checkMilestone,
    checkLabel,
    checkCommitMessages
  }
};