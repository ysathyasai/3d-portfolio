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

test('CHAPTERS has 14 chapters and camera progress conversions are deterministic and reversible', () => {
  assert.equal(CHAPTERS.length, 14);
  assert.equal(clamp01(-0.5), 0);
  assert.equal(clamp01(1.5), 1);

  for (let i = 0; i < CHAPTERS.length; i++) {
    const progress = getProgressFromChapterIndex(i, CHAPTERS.length);
    const resolvedIdx = getChapterIndexFromProgress(progress, CHAPTERS.length);
    assert.equal(resolvedIdx, i);
  }
});

test('interpolateCameraState matches desktop and mobile portrait endpoints and reverses cleanly', () => {
  const startDesktop = interpolateCameraState(0, false);
  assert.equal(startDesktop.activeChapterIndex, 0);
  assert.deepEqual(startDesktop.cameraPosition, CHAPTERS[0].cameraPosition);

  const startMobile = interpolateCameraState(0, true);
  assert.equal(startMobile.activeChapterIndex, 0);
  assert.deepEqual(startMobile.cameraPosition, CHAPTERS[0].mobileCameraPosition);

  const endDesktop = interpolateCameraState(1, false);
  assert.equal(endDesktop.activeChapterIndex, CHAPTERS.length - 1);
  assert.deepEqual(endDesktop.cameraPosition, CHAPTERS[CHAPTERS.length - 1].cameraPosition);

  const midForward = interpolateCameraState(0.45, false);
  const midBackward = interpolateCameraState(0.45, false);
  assert.deepEqual(midForward, midBackward);
});

test('filterProjects filters all 9 projects by category and search keyword accurately', () => {
  assert.equal(PROJECTS.length, 9);
  const all = filterProjects(PROJECTS, 'all', '');
  assert.equal(all.length, PROJECTS.length);

  const sihMatch = filterProjects(PROJECTS, 'ai-ml', 'Sarvam');
  assert.equal(sihMatch.length, 1);
  assert.equal(sihMatch[0].id, 'khet2kitchen');

  const yieldMatch = filterProjects(PROJECTS, 'fullstack', 'PBKDF2');
  assert.equal(yieldMatch.length, 1);
  assert.equal(yieldMatch[0].id, 'yieldgrid');

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

test('executeTerminalCommand resolves verified Easter eggs, chapter jumps, and project open actions without roll numbers', () => {
  const eduRes = executeTerminalCommand('education');
  assert.ok(eduRes.response.includes('VNR VJIET'));
  assert.ok(eduRes.response.includes('GIOE'));

  const openRes = executeTerminalCommand('open yieldgrid');
  assert.equal(openRes.action, 'open-project');
  assert.equal(openRes.targetId, 'yieldgrid');

  const gotoRes = executeTerminalCommand('goto playground');
  assert.equal(gotoRes.action, 'jump-chapter');
  assert.equal(gotoRes.targetId, 'playground');
});

test('parseInitialUrlState supports ?autostart=1, ?view=quick, and 14-chapter deep links', () => {
  const auto = parseInitialUrlState('?autostart=1', '');
  assert.equal(auto.skipIntro, true);
  assert.equal(auto.initialChapterIndex, 0);

  const deep = parseInitialUrlState('?chapter=projects&project=khet2kitchen', '#projects');
  assert.equal(deep.skipIntro, true);
  assert.equal(deep.initialChapterIndex, 6);
  assert.equal(deep.selectedProjectId, 'khet2kitchen');
});
