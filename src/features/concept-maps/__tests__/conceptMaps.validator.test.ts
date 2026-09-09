/**
 * Concept Maps Dataset Validator Unit Tests
 */

import { CONCEPT_MAPS, CONCEPT_MAP_SUBJECTS } from '../conceptMaps.data';
import {
  validateConceptMapsCatalog,
  validateConceptMap,
  VALID_SUBJECTS,
  VALID_NODE_TYPES,
  VALID_RELATIONSHIPS,
} from '../conceptMaps.validator';

describe('Concept Maps Dataset Validator', () => {
  it('validates the complete 16-map starter catalog without any issues', () => {
    const result = validateConceptMapsCatalog(CONCEPT_MAPS);

    if (!result.isValid) {
      console.error('Validation issues:', JSON.stringify(result.issues, null, 2));
    }

    expect(result.isValid).toBe(true);
    expect(result.issues).toEqual([]);
    expect(result.totalMaps).toBeGreaterThanOrEqual(15);
  });

  it('contains at least 15 concept maps across Physics, Chemistry, Biology, Space, and Environment', () => {
    expect(CONCEPT_MAPS.length).toBe(16);

    const counts: Record<string, number> = {};
    CONCEPT_MAPS.forEach((map) => {
      counts[map.subject] = (counts[map.subject] || 0) + 1;
    });

    expect(counts['physics']).toBe(5);
    expect(counts['chemistry']).toBe(4);
    expect(counts['biology']).toBe(5);
    expect(counts['space']).toBe(1);
    expect(counts['environment']).toBe(1);

    expect(counts['physics']).toBeGreaterThanOrEqual(5);
    expect(counts['chemistry']).toBeGreaterThanOrEqual(4);
    expect(counts['biology']).toBeGreaterThanOrEqual(5);
    expect(counts['space']).toBeGreaterThanOrEqual(1);
    expect(counts['environment']).toBeGreaterThanOrEqual(1);
  });

  it('verifies all 5 subject definitions have English and Tamil labels', () => {
    expect(CONCEPT_MAP_SUBJECTS.length).toBe(5);
    CONCEPT_MAP_SUBJECTS.forEach((sub) => {
      expect(VALID_SUBJECTS).toContain(sub.id);
      expect(sub.title.en).toBeTruthy();
      expect(sub.title.ta).toBeTruthy();
      expect(sub.subtitle.en).toBeTruthy();
      expect(sub.subtitle.ta).toBeTruthy();
      expect(sub.icon).toBeTruthy();
    });
  });

  it('ensures every map has at least one root node and at least one key node', () => {
    CONCEPT_MAPS.forEach((map) => {
      const rootNodes = map.nodes.filter((n) => n.type === 'root');
      const keyNodes = map.nodes.filter((n) => n.keyNode);
      expect(rootNodes.length).toBeGreaterThanOrEqual(1);
      expect(keyNodes.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('ensures every connection references valid node IDs within the same map', () => {
    CONCEPT_MAPS.forEach((map) => {
      const nodeIds = new Set(map.nodes.map((n) => n.id));
      map.connections.forEach((conn) => {
        expect(nodeIds.has(conn.fromNodeId)).toBe(true);
        expect(nodeIds.has(conn.toNodeId)).toBe(true);
        expect(VALID_RELATIONSHIPS).toContain(conn.relationship);
      });
    });
  });

  it('catches invalid map data correctly', () => {
    const invalidMap: any = {
      id: '',
      subject: 'invalid_subject',
      gradeGroup: 'unknown',
      difficulty: 'extreme',
      estimatedMinutes: 20,
      title: { en: '', ta: '' },
      subtitle: { en: '', ta: '' },
      description: { en: '', ta: '' },
      keyTakeaway: { en: '', ta: '' },
      nodes: [],
      connections: [],
      tags: [],
    };

    const issues = validateConceptMap(invalidMap);
    expect(issues.length).toBeGreaterThan(0);
    const fields = issues.map((i) => i.field);
    expect(fields).toContain('id');
    expect(fields).toContain('subject');
    expect(fields).toContain('gradeGroup');
    expect(fields).toContain('difficulty');
    expect(fields).toContain('nodes');
  });
});
