module.exports = {
  name: 'ngrx-workshop',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngrx-workshop',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
