import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp01,
  getChapterIndexFromProgress,
  getProgressFromChapterIndex,
  interpolateCameraState,
  filterProjects,
  validateContactInput,
  executeTerminalCommand,
  parseInitialUrlState,
} from './worldLogic';
import { CHAPTERS, PROJECTS } from '../data/portfolio';

test('camera progress and chapter index conversions are deterministic and reversible', () => {
  assert.equal(clamp01(-0.5), 0);
  assert.equal(clamp01(1.5), 1);

  for (let i = 0; i < CHAPTERS.length; i++) {
    const progress = getProgressFromChapterIndex(i, CHAPTERS.length);
    const resolvedIdx = getChapterIndexFromProgress(progress, CHAPTERS.length);
    assert.equal(resolvedIdx, i);
  }
});

test('interpolateCameraState matches exact endpoints and reverses cleanly', () => {
  const start = interpolateCameraState(0);
  assert.equal(start.activeChapterIndex, 0);
  assert.deepEqual(start.cameraPosition, CHAPTERS[0].cameraPosition);

  const end = interpolateCameraState(1);
  assert.equal(end.activeChapterIndex, CHAPTERS.length - 1);
  assert.deepEqual(end.cameraPosition, CHAPTERS[CHAPTERS.length - 1].cameraPosition);

  const midForward = interpolateCameraState(0.4);
  const midBackward = interpolateCameraState(0.4);
  assert.deepEqual(midForward, midBackward);
});

test('filterProjects filters by category and search keyword accurately', () => {
  const all = filterProjects(PROJECTS, 'all', '');
  assert.equal(all.length, PROJECTS.length);

  const sihMatch = filterProjects(PROJECTS, 'ai-ml', 'Sarvam');
  assert.equal(sihMatch.length, 1);
  assert.equal(sihMatch[0].id, 'khet2kitchen');

  const web3Match = filterProjects(PROJECTS, 'web3', 'Cardano');
  assert.equal(web3Match.length, 1);
  assert.equal(web3Match[0].id, 'cardano-web3-suite');
});

test('validateContactInput rejects invalid inputs and accepts valid transmissions', () => {
  const invalid = validateContactInput({ name: 'A', email: 'not-an-email', message: 'short' });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactInput({
    name: 'Recruiter Jane',
    email: 'jane@company.com',
    message: 'We would love to interview you for our AI Engineer role in Hyderabad.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('executeTerminalCommand resolves verified Easter eggs and project open actions', () => {
  const rollRes = executeTerminalCommand('roll');
  assert.ok(rollRes.response.includes('23054-AI-051'));

  const openRes = executeTerminalCommand('open kodex');
  assert.equal(openRes.action, 'open-project');
  assert.equal(openRes.targetId, 'kodex');
});

test('parseInitialUrlState supports ?autostart=1, ?view=quick, and chapter deep links', () => {
  const auto = parseInitialUrlState('?autostart=1', '');
  assert.equal(auto.skipIntro, true);
  assert.equal(auto.initialChapterIndex, 0);

  const deep = parseInitialUrlState('?chapter=projects&project=khet2kitchen', '#projects');
  assert.equal(deep.skipIntro, true);
  assert.equal(deep.initialChapterIndex, 3);
  assert.equal(deep.selectedProjectId, 'khet2kitchen');
});
