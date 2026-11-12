"""Verificaciones del generador compartido entre Python local y PyScript."""

import unittest

from static.python.ascii_art import GLYPHS, render_ascii_arches


class AsciiArtTests(unittest.TestCase):
    def test_desktop_and_mobile_dimensions(self):
        for mobile, columns, rows in [(False, 220, 54), (True, 92, 44)]:
            with self.subTest(mobile=mobile):
                frame = render_ascii_arches(mobile=mobile)
                self.assertEqual(len(frame.splitlines()), rows)
                self.assertTrue(all(len(row) == columns for row in frame.splitlines()))
                self.assertLessEqual(set(frame), set(GLYPHS + "\n"))

    def test_time_changes_the_frame_without_changing_its_size(self):
        for mobile in (False, True):
            with self.subTest(mobile=mobile):
                first = render_ascii_arches(mobile=mobile)
                later = render_ascii_arches(1.25, mobile=mobile)
                self.assertNotEqual(first, later)
                self.assertEqual(len(first), len(later))


if __name__ == "__main__":
    unittest.main()
